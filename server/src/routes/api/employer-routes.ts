import express from 'express';
import type { Request, Response } from 'express';
import Data from '../data.js';
import { authenticateToken } from '../../middleware/auth';
import { Schedule } from '../../models/schedule';
import { Employee } from '../../models/employee';

const router = express.Router();

// Apply authenticateToken middleware to protect the routes
router.use(authenticateToken);

// View schedule by week
router.get('schedule/week', async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;

        // Set default values for startDate and endDate if not provided
        const { firstDay, lastDay } = Data.getCurrentWeek();
        const start = startDate ? new Date(startDate as string) : firstDay;
        const end = endDate ? new Date(endDate as string) : lastDay;

        console.log(`Fetching schedule from ${startDate} to ${endDate}`);

        // Ensure dates are provided
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start date and end date are required' });
        }

        // Fetch schedule from MongoDB
        const dbSchedule = await Data.teamSchedule(start, end);

        return res.json(dbSchedule);
    } catch (err: any) {
        console.error('Error fetching schedule:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// View schedule for the day
router.get('schedule/day', async (req: Request, res: Response) => {
    try {
      const { date } = req.query;
  
      // Set default value for date if not provided
      const currentDate = Data.getCurrentDate();
      const day = date ? new Date(date as string) : currentDate;
  
      console.log(`Fetching schedule for ${day}`);
  
      // Fetch schedule from MongoDB
      const dbSchedule = await Data.dailyTeamSchedule(day);
  
      return res.json(dbSchedule);
    } catch (err: any) {
      console.error('Error fetching schedule:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  });

// create new schedule with multiple entries
  router.post('/schedule/new', async (req: Request, res: Response) => {
    //review this: const validate = await Data.validate(req, res); (from data.ts 85)

    const { schedules } = req.body;
  
    try {
      const createdSchedules = await Schedule.insertMany(schedules);
  
      return res.status(201).json({
        message: 'Schedules created successfully',
        insertedCount: createdSchedules.length,
      });
    } catch (error) {
      console.error('Error inserting schedules:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

// update schedule by date
const date = `{date from model?}`; //change this once model is created or remove
router.put(`/schedule/${date}`), async (req: Request, res: Response) => {
    try {
        const { start, end, employee_id, job_id } = req.body;

        // Ensure all fields are provided
        if (!start || !end || !employee_id || !job_id) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Update schedule in MongoDB
        const dbSchedule = await Data.updateSchedule(date, start, end, employee_id, job_id);

        return res.json(dbSchedule);
    }
    catch (err: any) {
        console.error('Error updating schedule:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

// get all jobs
router.get('/jobs')

// get job by id
router.get('/jobs/:job_id')

// create new job
router.post('/jobs/new')

// update job by id
router.put('/jobs/:job_id')

// delete job by id
router.delete('/jobs/:id')

// get all employees
router.get('/employees', async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    }
    catch (err: any) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }});

// get employee by id
router.get('/employees/:employee_id', async (req: Request, res: Response) => {
    try {
        const employee_id = await Employee.findById(req.params.employee_id);
        res.json(employee_id);
    }
    catch (err: any) {
        console.error('Error fetching employee:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }});

// create new employee
router.post('/employees/new')

// update employee by id
router.put('/employees/:employee_id')

// delete employee by id
router.delete('/employees/:employee_id')

export {router as employerRouter};