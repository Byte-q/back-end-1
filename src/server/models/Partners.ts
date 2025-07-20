import mongoose, { Document, Model } from 'mongoose';

export const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  description: {
    type: String,
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
  isActive: {
    type: Boolean,
    required: false,
  },
})

export interface IPartner {
  name: string;
  logoUrl?: string;
  website?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

type PartnerDocument = IPartner & Document;
export const PartnerModel: Model<PartnerDocument> = mongoose.model<PartnerDocument>('partners', PartnerSchema);
