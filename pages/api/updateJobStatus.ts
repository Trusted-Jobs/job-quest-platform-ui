import type { NextApiRequest, NextApiResponse } from "next";
import inMemoryDB from "@/utils/inMemoryDB";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { jobId, status } = req.body;
    // if (typeof jobId !== "number" || typeof status !== "string") {
    //   return res.status(400).json({ error: "Invalid jobId or status" });
    // }

    // Find the job in inMemoryDB
    const jobIndex = inMemoryDB.jobs.findIndex((job) => job.jobId == jobId);
    if (jobIndex === -1) {
      return res.status(404).json({ error: "Job not found" });
    }
    console.log('status', status);
    // Update the job status
    inMemoryDB.jobs[jobIndex] = {
      ...inMemoryDB.jobs[jobIndex],
      status,
    };

    // Return the updated job
    const updatedJob = inMemoryDB.jobs[jobIndex];
    return res.status(200).json({ message: `Job status updated to ${status}`, job: updatedJob });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
