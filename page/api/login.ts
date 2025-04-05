import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import inMemoryDB from "@/utils/inMemoryDB";

interface User {
  name: string;
  email: string;
  password: string;
  isVerified: string[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const user = inMemoryDB.users.find((u: User) => u.email === email && u.password === password);

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      setCookie("name", user.name, { req, res });
      setCookie("email", user.email, { req, res });
      setCookie("isVerifiedLength", user.isVerified.length, { req, res });

      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to login" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
