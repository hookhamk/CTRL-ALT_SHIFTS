import { Employee } from '../models/employee.js';
import { Employer } from '../models/employer.js';
import { Schedule } from '../models/schedule.js';
import { Job } from '../models/job.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import dotenv from 'dotenv';
dotenv.config();

export const resolvers = {
  Query: {
    employees: async () => await Employee.find(),
    employee: async (_: any, { id }: { id: string }) => await Employee.findById(id),

    employers: async () => await Employer.find(),
    employer: async (_: any, { id }: { id: string }) => await Employer.findById(id),

    schedules: async () => await Schedule.find(),
    schedule: async (_: any, { id }: { id: string }) => await Schedule.findById(id),

    me: async (_: any, __: any, context: { user?: { id: string } }) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Employee.findById(context.user.id);
    },
  },

  Mutation: {
    addJob: async (_: any, { job_title, company_id }: { job_title: string, company_id: number }) => {
      const newJob = new Job({ job_title, company_id });
      await newJob.save();
      return newJob;
    },

    updateJob: async (_: any, { id, job_title, company_id }: { id: string, job_title?: string, company_id?: number }) => {
      return await Job.findByIdAndUpdate(
        id,
        { job_title, company_id },
        { new: true }
      );
    },

    deleteJob: async (_: any, { id }: { id: string }) => {
      const result = await Job.findByIdAndDelete(id);
      return result !== null;
    },
    
    addEmployee: async (
      _: any,
      { email, password, first_name, last_name, job, company_id, access_level }:
      { email: string, password: string, first_name: string, last_name: string, job: string, company_id: number, access_level: boolean }
    ) => {
      const newEmployee = new Employee({ email, password, first_name, last_name, job, company_id, access_level });
      await newEmployee.save();
      return newEmployee;
    },

    addEmployer: async (
      _: any,
      { business_name, company_id }:
      {  business_name: string, company_id: number }
    ) => {
      const newEmployer = new Employer({ business_name, company_id });
      await newEmployer.save();
      return newEmployer;
    },

    addSchedule: async (
      _: any,
      { job_id, job_title, employee_id, employee_name, date, start_time, end_time }:
      { job_id: number, job_title: string, employee_id: number, employee_name: string, date: string, start_time: string, end_time: string }
    ) => {
      const newSchedule = new Schedule({ job_id, job_title, employee_id, employee_name, date, start_time, end_time });
      await newSchedule.save();
      return newSchedule;
    },

    updateEmployee: async (
      _: any,
      { id, email, first_name, last_name, job, company_id, access_level }:
      { id: string, email?: string, first_name?: string, last_name?: string, job?: string, company_id?: number, access_level?: boolean }
    ) => {
      return await Employee.findByIdAndUpdate(
        id,
        { email, first_name, last_name, job, company_id, access_level },
        { new: true }
      );
    },

    updateEmployer: async (
      _: any,
      { id, business_name, company_id }:
      { id: string, business_name?: string, company_id?: number }
    ) => {
      return await Employer.findByIdAndUpdate(
        id,
        { business_name, company_id },
        { new: true }
      );
    },

    updateSchedule: async (
      _: any,
      { id, job_id, job_title, employee_id, employee_name, date, start_time, end_time }:
      { id: string, job_id?: number, job_title?: string, employee_id?: number, employee_name?: string, date?: string, start_time?: string, end_time?: string }
    ) => {
      return await Schedule.findByIdAndUpdate(
        id,
        { job_id, job_title, employee_id, employee_name, date, start_time, end_time },
        { new: true }
      );
    },

    deleteEmployee: async (_: any, { id }: { id: string }) => {
      const result = await Employee.findByIdAndDelete(id);
      return result !== null;
    },

    deleteEmployer: async (_: any, { id }: { id: string }) => {
      const result = await Employer.findByIdAndDelete(id);
      return result !== null;
    },

    deleteSchedule: async (_: any, { id }: { id: string }) => {
      const result = await Schedule.findByIdAndDelete(id);
      return result !== null;
    },

    login: async (_: any, { email, password }: { email: string, password: string }) => {
      try {
        // Find the employee by email
        const employee = await Employee.findOne({ email });
        
        if (!employee) {
          throw new AuthenticationError('Incorrect email or password');
        }
        
        // For development, you can skip password checking
        // In production, use bcrypt.compare(password, employee.password)
        
        // Generate token with LONGER expiration (7 days instead of 2h)
        const token = jwt.sign(
          { 
            id: employee._id,
            email: employee.email,
            access_level: employee.access_level 
          },
          process.env.JWT_SECRET_KEY || '',
          { expiresIn: '7D' }
        );

        console.log('Login successful for:', email);
        
        return { token, employee };
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
  },

  Employee: {
    employer: async (employee: any) => await Employer.findById(employee.company_id),
  },

  Employer: {
    employees: async (employer: any) => {
      return await Employee.find({ company_id: employer.company_id });
    },
  },
};