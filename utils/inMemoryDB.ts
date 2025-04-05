interface InMemoryDB {
  users: any[];
  jobs: any[];
}

const inMemoryDB: InMemoryDB = {
  users: [
    {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      password: "9999",
      isVerified: ["nationality"],
      riskLevel: "LOW",
      myJobs: [],
      myPosts: [],
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      isVerified: ["nationality"],
      riskLevel: "LOW",
      myJobs: [],
      myPosts: [],
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securepass456",
      isVerified: [],
      riskLevel: "HIGH",
      myJobs: [],
      myPosts: [],
    },
  ],
  jobs: [
    {
      id: 1,
      jobId: 1,
      title: "Frontend Developer",
      company: "PixelSoft",
      location: "Remote",
      salary: "$3000/month",
      status: "applied",
      recruiter: {
        name: "John Doe",
        riskLevel: "LOW",
        isVerified: ["nationality"],
      },
    },
    {
      id: 2,
      jobId: 2,
      title: "Game Designer",
      company: "RetroWorks",
      location: "New York",
      salary: "$4000/month",
      status: "applied",
      recruiter: {
        name: "John Doe",
        riskLevel: "LOW",
        isVerified: ["nationality"],
      },
    },
    {
      id: 3,
      jobId: 3,
      title: "QA Tester",
      company: "BitQuest",
      location: "Remote",
      salary: "$2500/month",
      status: "new",
      recruiter: {
        name: "Jane Smith",
        riskLevel: "HIGH",
        isVerified: [],
      },
    },
  ],
};

export default inMemoryDB;
