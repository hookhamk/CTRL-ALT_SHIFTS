import { Schema, model, Types } from 'mongoose';

interface ISchedule {
  job_id: number;
  job_title: string;
  employee_id: Types.ObjectId;
  employee_name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
}

const ScheduleSchema = new Schema<ISchedule>({
  job_id: { 
    type: Number, 
    required: true
   },
  job_title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  employee_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Employee',
    required: true, 
    trim: true 
  },
  employee_name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  start_time: { 
    type: Date, 
    required: true 
  },
  end_time: { 
    type: Date, 
    required: true 
  },
});

const Schedule = model<ISchedule>('Schedule', ScheduleSchema);
export { Schedule, ISchedule };

