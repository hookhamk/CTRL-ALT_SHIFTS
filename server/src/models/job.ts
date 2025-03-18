import { Schema, model, type Document, Types  } from 'mongoose';

interface IJob extends Document {
    _id: Types.ObjectId;
    job_title: string;
    company_id: number;
}

const jobSchema = new Schema<IJob> ({
    job_title: {
        type: String,
        required: true,
    },
    company_id: {
        type: Number,
        required: true,
    }
});

const Job = model<IJob>('Job', jobSchema);

export  { Job, IJob }
