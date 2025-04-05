import { NextApiRequest, NextApiResponse } from "next";
import inMemoryDB from "../../utils/inMemoryDB";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isVerified: string[];
  riskLevel: string;
  myJobs: number[];
  myPosts: number[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, myJobs, isVerified, myPosts } = req.body;

    try {
      const userIndex = inMemoryDB.users.findIndex((user: User) => user.name === name);

      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      const existingUser = inMemoryDB.users[userIndex];

      // 更新 myJobs
      const updatedMyJobs = myJobs
        ? Array.from(new Set([...(existingUser.myJobs || []), ...myJobs]))
        : existingUser.myJobs;

      // 更新 isVerified
      const updatedIsVerified = isVerified
        ? Array.from(new Set([...(existingUser.isVerified || []), ...isVerified]))
        : existingUser.isVerified;

      // 更新 myPosts
      const updatedMyPosts = myPosts
        ? Array.from(new Set([...(existingUser.myPosts || []), ...myPosts]))
        : existingUser.myPosts;

      // 更新 riskLevel
      const updatedRiskLevel = updatedIsVerified.includes("ofac") ? "LOW" : "MEDIUM";
      console.log("Updated risk level:", updatedRiskLevel);

      inMemoryDB.users[userIndex] = {
        ...existingUser,
        myJobs: updatedMyJobs,
        isVerified: updatedIsVerified,
        myPosts: updatedMyPosts,
        riskLevel: updatedRiskLevel,
      };

      return res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update user data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
