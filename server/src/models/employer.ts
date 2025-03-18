import { Schema, model, type Document, Types  } from 'mongoose';
import mongoose from 'mongoose';

interface IEmployer extends Document {
    _id: Types.ObjectId;
    company_id: number;
    business_name: string;
}

const employerSchema = new Schema<IEmployer> ({
    company_id: {
        type: Number,
        required: true,
        unique: true,
    },
    business_name: {
        type: String,
        required: true,
    }
});

const Employer = model<IEmployer>('Employer', employerSchema);

export  { Employer, IEmployer }
