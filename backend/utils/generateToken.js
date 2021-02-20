import jwt from 'jsonwebtoken';

// set this to one hour when deploying to production
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});
export default generateToken;
