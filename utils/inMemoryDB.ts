// 如果全域變數已存在，則使用現有的，否則初始化
declare global {
  var inMemoryDB: {
    users: Array<{
      id: number;
      name: string;
      email: string;
      password: string;
      isVerified: string[];
      riskLevel: string;
      myJobs: number[];
      myPosts: number[];
    }>;
    jobs: Array<{
      id: number;
      jobId: number;
      title: string;
      company: string;
      location: string;
      salary: string;
      status: string;
      recruiter: {
        name: string;
        riskLevel: string;
        isVerified: string[];
      };
    }>;
  };
}

globalThis.inMemoryDB = globalThis.inMemoryDB || {
  users: [
    {
      id: 1,
      name: "Admin",
      email: "admin@example.com",
      password: "admin1234",
      isVerified: ["nationality"],
      riskLevel: "LOW",
      myJobs: [],
      myPosts: [],
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "test1234",
      isVerified: ["nationality"],
      riskLevel: "LOW",
      myJobs: [],
      myPosts: [1, 2],
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "test1234",
      isVerified: [],
      riskLevel: "HIGH",
      myJobs: [1, 2],
      myPosts: [3],
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

export default globalThis.inMemoryDB;
