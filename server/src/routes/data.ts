import { Employee } from '../models/employee';
import { Schedule, ISchedule } from '../models/schedule';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

class Data {
    // Helper function to get the start and end of the current week
    getCurrentWeek = () => {
        const now = new Date();
        const firstDay = new Date(now.setDate(now.getDate() - now.getDay()));
        const lastDay = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        return { firstDay, lastDay };
    }

    // Helper function to get the current date
    getCurrentDate = () => {
        return new Date();
    }

    async findAll() {
        return await Employee.find();
    }

    async findById(id: number) {
        return await Employee.findById(id);
    }

    async getSchedule(employee_id: number, start: Date, end: Date): Promise<ISchedule[]> {
        return await Schedule.find({
          employee_id,
          date: {
            $gte: start,
            $lte: end,
          },
        }).exec();
      }

    async dailySchedule(employee_id: number, date: Date) {
        const dateSchedule = await Schedule.findOne({
            where: {
                employee_id: employee_id,
                date: date
            },
        });

        return dateSchedule;
    }

    async teamSchedule(start: Date, end: Date) {
        const currentSchedule = await Schedule.findOne({
            where: {
                start: start,
                end: end
            },
        });

        return currentSchedule;
    }

    async dailyTeamSchedule(date: Date) {
        const dateSchedule = await Schedule.findOne({
            where: {
                date: date
            },
        });

        return dateSchedule;
    }

    async updateSchedule(date: string, start: number, end: number, employee_id: number, job_id: number) {
        const updatedSchedule = await Schedule.create({
            date: date,
            start: start,
            end: end,
            employee_id: employee_id,
            job_id: job_id
        });

        return updatedSchedule;
    }

    validate = (_req: Request, _res: Response) => {
            [
            body('schedules')
              .isArray({ min: 1 })
              .withMessage('Schedules must be an array with at least one entry'),
            
            body('schedules.*.job_id')
              .isInt({ min: 1 })
              .withMessage('Each schedule must have a valid job_id'),
            
            body('schedules.*.job_title')
              .isString()
              .trim()
              .notEmpty()
              .withMessage('Each schedule must have a job_title'),
            
            body('schedules.*.employee_name')
              .isString()
              .trim()
              .notEmpty()
              .withMessage('Each schedule must have an employee_name'),
          
            body('schedules.*.start_time')
              .isISO8601()
              .withMessage('start_time must be a valid date-time (ISO 8601 format)'),
          
            body('schedules.*.end_time')
              .isISO8601()
              .withMessage('end_time must be a valid date-time (ISO 8601 format)'),
          ];
    
            const errors = validationResult(_req);
            if (!errors.isEmpty()) {
                return _res.status(400).json({ errors: errors.array() });
            }
            return;
        }
}

export default new Data();
