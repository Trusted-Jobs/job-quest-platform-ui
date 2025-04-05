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
      const recruiterName = req.cookies.name || "Unknown Recruiter";
      const recruiter = inMemoryDB.users.find((user: { name:string; email: string; riskLevel?: string; isVerified: string[] }) => user.name === recruiterName) || { riskLevel: "HIGH", isVerified: [] };

      const job = { 
        ...req.body, 
        status: "new", 
        recruiter: { 
          name: recruiterName,
          risk: recruiter.riskLevel,
          isVerified: recruiter.isVerified
        }
      };

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
