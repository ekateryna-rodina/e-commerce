import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234567", 10),
    isAdmin: true,
  },
  {
    name: "user 1",
    email: "work.rodina@gmail.com",
    password: bcrypt.hashSync("1234567", 10),
  },
  {
    name: "admin2",
    email: "karie.rodina@gmail.com",
    password: bcrypt.hashSync("1234567", 10),
  },
];

export default users;
