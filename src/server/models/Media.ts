import mongoose, { Document, Model } from 'mongoose';

const MediaFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  altText: { type: String, required: false, },
  title: { type: String, required: false, },
  uploadedBy: { type: String, required: false, },
  createdAt: { type: Date, default: Date.now, required: false, },
  updatedAt: { type: Date, default: Date.now, required: false, },
  isActive: { type: Boolean, default: true, required: false, },
});

export interface IMediaFile {
  filename: string;
  url: string;
  type: string;
  size: number;
  altText?: string;
  title?: string;
  uploadedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}


export type MediaFileDocument = IMediaFile & Document;
export const MediaFileModel: Model<MediaFileDocument> = mongoose.model<MediaFileDocument>('mediafile', MediaFileSchema);
