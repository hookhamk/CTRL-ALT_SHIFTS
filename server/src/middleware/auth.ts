import jwt from 'jsonwebtoken';
import { Employee } from '../models/employee.js';
import type { Request } from 'express';

interface JwtPayload {
  id: number;
  email: string;
  password: string;
}

export const authenticateToken = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null; // No token, no access

    const token = authHeader.split(' ')[1];
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    
    // Fetch the employee from the database
    const employee = await Employee.findById(decoded.id);
    if (!employee) return null;

    // Return the employee data
    return { 
      id: employee._id.toString(), // Ensure ID is a string
      company_id: employee.company_id, 
      access_level: employee.access_level 
    };
  } catch (err) {
    console.error('JWT verification error:', err);
    return null;
  }
};