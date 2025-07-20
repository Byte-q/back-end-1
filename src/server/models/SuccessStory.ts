import mongoose, { Document, Model} from 'mongoose';

const SuccessStorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        requied: true,
    },
    graduationYear: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    scholarshipName: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    isPublished: {
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
    }
});

export interface ISuccessStory {
  name: string,
  title: string,
  slug: string,
  content: string,
  university: string,
  country: string,
  degree: string,
  graduationYear: string,
  thumbnailUrl: string,
  studentName: string,
  scholarshipName: string,
  imageUrl?: string,
  isPublished?: boolean,
  createdAt?: Date,
};

type SuccessStoryDocument = ISuccessStory & Document;
export const SuccessStoryModel: Model<SuccessStoryDocument> = mongoose.model<SuccessStoryDocument>('Success-story', SuccessStorySchema);
