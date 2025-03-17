import mongoose from 'mongoose';
import { Employee, EmployeeDocument } from '../models/employee.js';
import { Employer, IEmployer } from '../models/employer.js';
import { Schedule, ISchedule } from '../models/schedule.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection string from your environment variables
const MONGO_URI = process.env.MONGO_URI || '';

// Connect to MongoDB
mongoose.connect(MONGO_URI);

// Clear existing data
const clearDatabase = async () => {
  try {
    await Employee.deleteMany({});
    await Employer.deleteMany({});
    await Schedule.deleteMany({});
    console.log('Database cleared successfully');
  } catch (error) {
    console.error('Error clearing database:', error);
    process.exit(1);
  }
};

// Seed the database with sample data
const seedDatabase = async () => {
  try {
    await clearDatabase();

    // Create employers (businesses with admins)
    const employers = await Employer.create([
      {
        first_name: 'John',
        last_name: 'Smith',
        business_name: 'Smith Tech Solutions',
        admin_id: 1001
      },
      {
        first_name: 'Sarah',
        last_name: 'Johnson',
        business_name: 'Johnson Cafe',
        admin_id: 1002
      },
      {
        first_name: 'Michael',
        last_name: 'Williams',
        business_name: 'Williams Retail',
        admin_id: 1003
      }
    ]);

    console.log('Employers created:', employers.length);

    const defaultPassword = 'password123'

    // Create employees (users)
    const employees = await Employee.create([
      // Smith Tech Solutions employees
      {
        email: 'john.smith@example.com',
        password: defaultPassword,
        first_name: 'John',
        last_name: 'Smith',
        job: 'CEO',
        company_id: 1001,
        access_level: false
      },
      {
        email: 'alice.jones@example.com',
        password: defaultPassword,
        first_name: 'Alice',
        last_name: 'Jones',
        job: 'Software Developer',
        company_id: 1001,
        access_level: false // Regular employee
      },
      {
        email: 'bob.miller@example.com',
        password: defaultPassword,
        first_name: 'Bob',
        last_name: 'Miller',
        job: 'UI Designer',
        company_id: 1001,
        access_level: false
      },
      
      // Johnson Cafe employees
      {
        email: 'sarah.johnson@example.com',
        password: defaultPassword,
        first_name: 'Sarah',
        last_name: 'Johnson',
        job: 'Owner',
        company_id: 1002,
        access_level: false
      },
      {
        email: 'dave.wilson@example.com',
        password: defaultPassword,
        first_name: 'Dave',
        last_name: 'Wilson',
        job: 'Chef',
        company_id: 1002,
        access_level: false
      },
      {
        email: 'emma.brown@example.com',
        password: defaultPassword,
        first_name: 'Emma',
        last_name: 'Brown',
        job: 'Barista',
        company_id: 1002,
        access_level: false
      },
      
      // Williams Retail employees
      {
        email: 'michael.williams@example.com',
        password: defaultPassword,
        first_name: 'Michael',
        last_name: 'Williams',
        job: 'Manager',
        company_id: 1003,
        access_level: false 
      },
      {
        email: 'lisa.davis@example.com',
        password: defaultPassword,
        first_name: 'Lisa',
        last_name: 'Davis',
        job: 'Sales Associate',
        company_id: 1003,
        access_level: false
      },
      {
        email: 'ryan.taylor@example.com',
        password: defaultPassword,
        first_name: 'Ryan',
        last_name: 'Taylor',
        job: 'Cashier',
        company_id: 1003,
        access_level: false
      }
    ]);

    console.log('Employees created:', employees.length);

    // Get the ObjectIds of employees for scheduling
    const aliceId = employees.find(e => e.email === 'alice.jones@example.com')?._id;
    const bobId = employees.find(e => e.email === 'bob.miller@example.com')?._id;
    const daveId = employees.find(e => e.email === 'dave.wilson@example.com')?._id;
    const emmaId = employees.find(e => e.email === 'emma.brown@example.com')?._id;
    const lisaId = employees.find(e => e.email === 'lisa.davis@example.com')?._id;
    const ryanId = employees.find(e => e.email === 'ryan.taylor@example.com')?._id;

    // Helper function to get date objects for the current week
    const getDateForDay = (dayOffset: number): Date => {
      const now = new Date();
      const day = now.getDate() - now.getDay() + dayOffset; // 0 = Sunday, 1 = Monday, etc.
      return new Date(now.setDate(day));
    };

    // Create schedules
    const schedules = await Schedule.create([
      // Smith Tech Solutions schedules
      {
        job_id: 101,
        job_title: 'Software Developer',
        employee_id: aliceId,
        employee_name: 'Alice Jones',
        date: getDateForDay(1), // Monday
        start_time: new Date(getDateForDay(1).setHours(9, 0)), // 9:00 AM
        end_time: new Date(getDateForDay(1).setHours(17, 0))   // 5:00 PM
      },
      {
        job_id: 101,
        job_title: 'Software Developer',
        employee_id: aliceId,
        employee_name: 'Alice Jones',
        date: getDateForDay(2), // Tuesday
        start_time: new Date(getDateForDay(2).setHours(9, 0)),
        end_time: new Date(getDateForDay(2).setHours(17, 0))
      },
      {
        job_id: 102,
        job_title: 'UI Designer',
        employee_id: bobId,
        employee_name: 'Bob Miller',
        date: getDateForDay(1), // Monday
        start_time: new Date(getDateForDay(1).setHours(10, 0)), // 10:00 AM
        end_time: new Date(getDateForDay(1).setHours(18, 0))    // 6:00 PM
      },
      
      // Johnson Cafe schedules
      {
        job_id: 201,
        job_title: 'Chef',
        employee_id: daveId,
        employee_name: 'Dave Wilson',
        date: getDateForDay(1), // Monday
        start_time: new Date(getDateForDay(1).setHours(8, 0)),  // 8:00 AM
        end_time: new Date(getDateForDay(1).setHours(16, 0))    // 4:00 PM
      },
      {
        job_id: 201,
        job_title: 'Chef',
        employee_id: daveId,
        employee_name: 'Dave Wilson',
        date: getDateForDay(3), // Wednesday
        start_time: new Date(getDateForDay(3).setHours(8, 0)),
        end_time: new Date(getDateForDay(3).setHours(16, 0))
      },
      {
        job_id: 202,
        job_title: 'Barista',
        employee_id: emmaId,
        employee_name: 'Emma Brown',
        date: getDateForDay(2), // Tuesday
        start_time: new Date(getDateForDay(2).setHours(7, 0)),  // 7:00 AM
        end_time: new Date(getDateForDay(2).setHours(15, 0))    // 3:00 PM
      },
      
      // Williams Retail schedules
      {
        job_id: 301,
        job_title: 'Sales Associate',
        employee_id: lisaId,
        employee_name: 'Lisa Davis',
        date: getDateForDay(5), // Friday
        start_time: new Date(getDateForDay(5).setHours(10, 0)), // 10:00 AM
        end_time: new Date(getDateForDay(5).setHours(18, 0))    // 6:00 PM
      },
      {
        job_id: 301,
        job_title: 'Sales Associate',
        employee_id: lisaId,
        employee_name: 'Lisa Davis',
        date: getDateForDay(6), // Saturday
        start_time: new Date(getDateForDay(6).setHours(9, 0)),  // 9:00 AM
        end_time: new Date(getDateForDay(6).setHours(17, 0))    // 5:00 PM
      },
      {
        job_id: 302,
        job_title: 'Cashier',
        employee_id: ryanId,
        employee_name: 'Ryan Taylor',
        date: getDateForDay(5), // Friday
        start_time: new Date(getDateForDay(5).setHours(12, 0)), // 12:00 PM
        end_time: new Date(getDateForDay(5).setHours(20, 0))    // 8:00 PM
      },
      {
        job_id: 302,
        job_title: 'Cashier',
        employee_id: ryanId,
        employee_name: 'Ryan Taylor',
        date: getDateForDay(7), // Sunday
        start_time: new Date(getDateForDay(7).setHours(10, 0)), // 10:00 AM
        end_time: new Date(getDateForDay(7).setHours(18, 0))    // 6:00 PM
      }
    ]);

    console.log('Schedules created:', schedules.length);
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection after seeding
    mongoose.connection.close();
  }
};

// Run the seed function
seedDatabase();
