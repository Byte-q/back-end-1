import mongoose, { Document, Model } from 'mongoose';

export const LevelSchema = new mongoose.Schema({
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

export interface ILevel {
    name: string;
    slug: string;
    description?: string;
};

type LevelDocument = ILevel & Document;
export const LevelModel: Model<LevelDocument> = mongoose.model<LevelDocument>('levels', LevelSchema);
