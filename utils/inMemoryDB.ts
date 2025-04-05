interface InMemoryDB {
  users: any[];
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
};

export default inMemoryDB;
