import { NextApiRequest, NextApiResponse } from "next";
import inMemoryDB from "../../utils/inMemoryDB";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const existingUser = inMemoryDB.users.find((u: { email: string }) => u.email === email);

      if (existingUser) {
        res.status(400).json({ message: "Email already registered." });
        return;
      }

      // 新增使用者資料
      inMemoryDB.users.push({ email, password, isVerify: [], riskLevel: "HIGH", myJobs: [], myPosts: [] });

      res.status(201).json({ message: "Registration successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to register user." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
