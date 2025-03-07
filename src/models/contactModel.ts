import { IContact } from '@/types/models';
import mongoose, { Schema } from 'mongoose';

const contactSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    mobile: {
        type: String
    },
    message: {
        type: String
    },
});

export const ContactSchema: Schema<IContact> = contactSchema;
