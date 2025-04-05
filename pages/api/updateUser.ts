import { NextApiRequest, NextApiResponse } from "next";
import inMemoryDB from "../../utils/inMemoryDB";

interface User {
  name: string;
  isVerified?: string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, isVerified } = req.body;

    try {
      const userIndex = inMemoryDB.users.findIndex((user: User) => user.name === name);

      if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
      }

      inMemoryDB.users[userIndex] = {
        ...inMemoryDB.users[userIndex],
        isVerified,
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
