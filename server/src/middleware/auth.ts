import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import type { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    employee?: {
      id: number;
      company_id: number;
      access_level: boolean;
    };
    user?: JwtPayload;
  }
}

interface JwtPayload {
  id: number;
  email: string;
  password: string;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';
    console.log('Secret Key:', secretKey); // Debug statement

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;
      console.log('Decoded:', decoded);

      const user = await User.findByPk(decoded.id);
      console.log('User:', user);

      if (!user) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user as JwtPayload;
      req.employee = { id: user.id, company_id: , access_level: user.access_level }; // Attach employee info
      return next();
    } catch (err) {
      console.error('JWT verification error:', err); // Debug statement
      return res.sendStatus(403);
    } 
  } else {
    res.sendStatus(401); // Unauthorized
  }
};