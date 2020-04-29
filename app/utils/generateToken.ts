import jwt from 'jsonwebtoken';

export const generateToken = (email) => {
  const date = new Date();
  // @TODO: make token expire in one hour
  date.setHours(date.getHours() + 1);

  return jwt.sign({ email, expiration: date }, process.env.JWT_SECRET);
};
