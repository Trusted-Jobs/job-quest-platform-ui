interface InMemoryDB {
  users: any[];
  jobs: any[];
}

const inMemoryDB: InMemoryDB = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      isVerified: ["nationality"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "securepass456",
      isVerified: [],
    },
  ],
  jobs: [
    {
      id: 1,
      title: "Frontend Developer",
      company: "PixelSoft",
      location: "Remote",
      salary: "$3000/month",
      recruiter: {
        name: "John Doe",
        riskLevel: "MEDIUM",
        isVerified: ["nationality"],
      },
    },
    {
      id: 2,
      title: "Game Designer",
      company: "RetroWorks",
      location: "New York",
      salary: "$4000/month",
      recruiter: {
        name: "John Doe",
        riskLevel: "MEDIUM",
        isVerified: ["nationality"],
      },
    },
    {
      id: 3,
      title: "QA Tester",
      company: "BitQuest",
      location: "Remote",
      salary: "$2500/month",
      recruiter: {
        name: "John Doe",
        riskLevel: "MEDIUM",
        isVerified: ["nationality"],
      },
    },
  ],
};

export default inMemoryDB;
