import jwt from 'jsonwebtoken';
import { config } from '../config';
import { IUser } from '../models/user.model';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn
    }
  );
};

export const verifyToken = (token: string): Promise<jwt.JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as jwt.JwtPayload);
      }
    });
  });
}; 