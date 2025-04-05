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

    const userPosts = user.myPosts.map((postId: number) => {
      const post = inMemoryDB.jobs.find((p) => p.jobId === postId);
      return post ? { jobId: post.jobId, title: post.title, status: post.status } : null;
    }).filter(Boolean);

    return res.status(200).json(userPosts);
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
