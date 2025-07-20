import mongoose, { Document, Model } from 'mongoose';

export const ScholarshipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    deadline: {
        type: String,
        required: false,
    },
    amount: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
        required: false,
    },
    university: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    startDate: {
        type: Date,
        required: false,
    },
    endDate: {
        type: Date,
        required: false,
    },
    isFeatured: {
        type: Boolean,
        required: false,
    },
    isFullyFunded: {
        type: Boolean,
        required: false,
    },
    isPublished: {
        type: Boolean,
        required: false,
    },
    seoTitle: {
        type: String,
        required: false,
    },
    seoDescription: {
        type: String,
        required: false,
    },
    seoKeywords: {
        type: String,
        required: false,
    },
    focusKeyword: {
        type: String,
        required: false,
    },
    countryId: {
        type: String,
        required: false,
    },
    levelId: {
        type: String,
        required: false,
    },
    categoryId: {
        type: String,
        required: false,
    },
    requirements: {
        type: String,
        required: false,
    },
    applicationLink: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    views: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        required: false,
    },
    updatedAt: {
        type: Date,
        required: false,
    },
});

export interface IScholarship {
    title: string;
    slug: string;
    description: string;
    content?: string;
    deadline?: string;
    amount?: string;
    currency?: string;
    university?: string;
    department?: string;
    website?: string;
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isFeatured?: boolean;
    isFullyFunded?: boolean;
    isPublished?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    focusKeyword?: string;
    countryId?: string;
    levelId?: string;
    categoryId?: string;
    requirements?: string;
    applicationLink?: string;
    imageUrl?: string;
    views?: number;
    createdAt?: Date;
    updatedAt?: Date;
  };

  type ScholarshipDocument = IScholarship & Document;
  export const ScholarshipModel: Model<ScholarshipDocument> = mongoose.model<ScholarshipDocument>('scholarships', ScholarshipSchema);
  
