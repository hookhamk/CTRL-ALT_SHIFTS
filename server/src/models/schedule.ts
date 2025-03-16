import mongoose, { Schema, Document } from 'mongoose';

interface ISchedule extends Document {
  schedule_id: number;
  job_id: number;
  job_title: string;
  employee_id: number;
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
    type: Number, 
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

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema);
export { Schedule, ISchedule };