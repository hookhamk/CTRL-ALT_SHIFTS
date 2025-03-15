import { Schema, model, type Document  } from 'mongoose';

interface IEmployer extends Document {
    employer_id: number;
    first_name: string,
    last_name: string,
    business_name: string;
    admin_id: number;
}

const employerSchema = new Schema<IEmployer> ({
    employer_id:{
        type: Number,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    business_name: {
        type: String,
        required: true,
    },
    admin_id: {
        type: Number,
        required: true,
    }
});

const Employer = model<IEmployer>('Employer', employerSchema);

export  { Employer, IEmployer }
