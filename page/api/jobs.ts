import { NextApiRequest, NextApiResponse } from "next";
import inMemoryDB from "../../utils/inMemoryDB";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      res.status(200).json(inMemoryDB.jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch jobs." });
    }
  } else if (req.method === "POST") {
    try {
      const job = req.body;

      // 新增工作資料
      inMemoryDB.jobs.push(job);

      res.status(200).json({ message: "Job added successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add job." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
