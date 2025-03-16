import { Employee } from '../models/employee';
import { Employer } from '../models/employer';

// Define resolvers for Employee and Employer models
export const resolvers = {
  Query: {
    // Fetch all employees
    employees: async () => {
      return await Employee.find();  
    },

    // Fetch a single employee by ID
    employee: async (_: any, { id }: { id: string }) => {
      return await Employee.findById(id);  
    },

    // Fetch all employers
    employers: async () => {
      return await Employer.find();  
    },

    // Fetch a single employer by ID
    employer: async (_: any, { id }: { id: string }) => {
      return await Employer.findById(id); 
    },
  },

  Mutation: {
    // Add a new employee
    addEmployee: async (
      _: any, 
      { email, first_name, last_name, job, company_id, access_level, password }: 
      { email: string, first_name: string, last_name: string, job: string, company_id: number, access_level: boolean, password: string }
    ) => {
      const newEmployee = new Employee({
        email,
        first_name,
        last_name,
        job,
        company_id,
        access_level,
        password,
      });

      await newEmployee.save();
      return newEmployee;
    },

    // Add a new employer
    addEmployer: async (
      _: any, 
      { first_name, last_name, business_name, admin_id }: 
      { first_name: string, last_name: string, business_name: string, admin_id: number }
    ) => {
      const newEmployer = new Employer({
        first_name,
        last_name,
        business_name,
        admin_id,
      });

      await newEmployer.save();
      return newEmployer;
    },

    // Update an existing employee
    updateEmployee: async (
      _: any,
      { id, email, first_name, last_name, job, company_id, access_level, password }: 
      { id: string, email?: string, first_name?: string, last_name?: string, job?: string, company_id?: number, access_level?: boolean, password?: string }
    ) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { email, first_name, last_name, job, company_id, access_level, password },
        { new: true }
      );
      return updatedEmployee;
    },

    // Update an existing employer
    updateEmployer: async (
      _: any,
      { id, first_name, last_name, business_name, admin_id }: 
      { id: string, first_name?: string, last_name?: string, business_name?: string, admin_id?: number }
    ) => {
      const updatedEmployer = await Employer.findByIdAndUpdate(
        id,
        { first_name, last_name, business_name, admin_id },
        { new: true }
      );
      return updatedEmployer;
    },
  },

  // Employee Resolver to link employee to employer (based on company_id)
  Employee: {
    employer: async (employee: any) => {
      return await Employer.findById(employee.company_id);  
    },
  },
};
