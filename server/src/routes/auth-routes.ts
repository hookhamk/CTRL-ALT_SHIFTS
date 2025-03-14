import { Router, type Request, type Response } from 'express';
import { Employee } from '../models/employee';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    const employee = await Employee.findOne({
      where: { email },
    });
    if (!employee) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const passwordIsValid = await bcrypt.compare(password, employee.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  
    const secretKey = process.env.JWT_SECRET_KEY || '';
  
    const token = jwt.sign({ id: employee.id, email: employee.email }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  };
  
  const router = Router();
  
  // POST /login - Login a user
  router.post('/login', login);
  
  export default router;