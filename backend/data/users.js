import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test account',
    email: 'test@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test account 2 ',
    email: 'test2@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test account 3 ',
    email: 'test3@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test account 4',
    email: 'test4@example.com',
    password: bcrypt.hashSync('123456', 10),
  },

];
export default users;
