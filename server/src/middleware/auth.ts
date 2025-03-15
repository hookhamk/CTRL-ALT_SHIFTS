import jwt from 'jsonwebtoken';
import { Employee } from '../models/employee';  // Use Employee model instead of User
import type { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    employee?: {
      id: number;
      company_id: number;
      access_level: boolean;
    };
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

    try {
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      // Use Employee model to find the employee
      const employee = await Employee.findById(decoded.id); // Assuming the id is linked to Employee
      if (!employee) {
        return res.sendStatus(403); // Forbidden
      }

      req.employee = { id: employee.id, company_id: employee.company_id, access_level: employee.access_level }; // Attach employee info
      return next();
    } catch (err) {
      console.error('JWT verification error:', err);
      return res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
};