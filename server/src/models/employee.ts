import { Schema, model, type Document } from 'mongoose';

interface EmployeeDocument extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  job: string;
  company_id: Schema.Types.ObjectId; // Use Schema.Types.ObjectId here
  access_level: boolean;
}

const employeeSchema = new Schema<EmployeeDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  job: { type: String, required: true },
  company_id: { type: Schema.Types.ObjectId, ref: 'Employer', required: true }, // Use Schema.Types.ObjectId
  access_level: { type: Boolean, required: true }
});

// Virtual to populate employer
employeeSchema.virtual('employer', {
  ref: 'Employer',
  localField: 'company_id',
  foreignField: '_id',
  justOne: true
});

const Employee = model<EmployeeDocument>('Employee', employeeSchema);
export { Employee, EmployeeDocument };