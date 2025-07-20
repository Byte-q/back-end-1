import mongoose, { Document, Model } from 'mongoose';

export const SeoSettingsSchema = new mongoose.Schema({
    pagePath: {
        type: String,
        required: true,
    },
    metaTitle: {
        type: String,
        required: false,
    },
    metaDescription: {
        type: String,
        required: false,
    },
    ogImage: {
        type: String,
        required: false,
    },
    keywords: {
        type: String,
        required: false,
    },
})

export interface ISeoSetting {
    pagePath: string;
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    keywords?: string;
  }

  type SeoSettingDocument = ISeoSetting & Document;
  export const SeoSettingModel: Model<SeoSettingDocument> = mongoose.model<SeoSettingDocument>('seoSettings', SeoSettingsSchema);
  
