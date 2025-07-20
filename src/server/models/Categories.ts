import mongoose, { Document, Model } from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
});

export interface ICategory {
    name: string;
    slug: string;
    description?: string;
};

type CategoryDocument = ICategory & Document;
export const CategoryModel: Model<CategoryDocument> = mongoose.model<CategoryDocument>('categories', CategorySchema);
