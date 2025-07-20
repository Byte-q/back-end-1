import mongoose, { Document, Model } from 'mongoose';

export interface IPage {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: String },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export type PageDocument = IPage & Document;
export const PageModel: Model<PageDocument> = mongoose.model<PageDocument>('page', PageSchema);
