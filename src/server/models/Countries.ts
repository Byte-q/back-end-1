import mongoose, { Document, Model } from 'mongoose';

export const CountrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    flagUrl: {
        type: String,
        required: false,
    }
});

export interface ICountry {
    name: string;
    slug: string;
    flagUrl?: string;
};

type CountryDocument = ICountry & Document;
export const CountryModel: Model<CountryDocument> = mongoose.model<CountryDocument>('countries', CountrySchema);
