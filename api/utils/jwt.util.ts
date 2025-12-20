import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const decodeJwt = (payload: JwtPayload) => {
  if(!payload) return null;
  return jwt.sign(payload, String(secret), { expiresIn: "30m" });
}

export const verifyJwt = (id: string) => {
  if(!id) return null;
  return jwt.verify(id, String(secret));
}