import { NextApiRequest, NextApiResponse } from 'next';
import inMemoryDB from '@/utils/inMemoryDB';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userName = req.cookies.name;

    if (!userName) {
      return res.status(400).json({ error: 'User not authenticated' });
    }

    const user = inMemoryDB.users.find((u) => u.name === userName);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userJobs = user.myJobs.map((jobId: number) => {
      const job = inMemoryDB.jobs.find((j) => j.jobId === jobId);
      return job ? { jobId, title: job.title, status: job.status } : null;
    }).filter(Boolean);

    return res.status(200).json(userJobs);
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
