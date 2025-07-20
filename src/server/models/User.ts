import mongoose, { Document, Model } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export interface IUser {
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  type UserDocument = IUser & Document;
  export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);