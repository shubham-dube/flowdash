import {  IUser } from '../types/models';
import mongoose, { Schema } from 'mongoose';

const userSchema: Schema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photoUrl: {
        type: String,
        default: ""
    },
    lastActiveAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: false
    },
    joiningDate: {
        type: Date,
        default: Date.now()
    },
});

export const UserSchema: Schema<IUser> = userSchema;
