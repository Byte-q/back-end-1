import mongoose, { Document, Model} from 'mongoose';

export const SiteSettingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: true,
    },
    siteTagline: {
        type: String,
        required: false,
    },
    siteDescription: {
        type: String,
        required: false,
    },
    favicon: {
        type: String,
        required: false,
    },
    logo: {
        type: String,
        required: false,
    },
    logoDark: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false
    },
    whatsapp: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    youtube: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    primarycolor: {
        type: String,
        required: false
    },
    secondaryColor: {
        type: String,
        required: false
    },
    accentColor: {
        type: String,
        required: false
    },
    enableDarkMode: {
        type: Boolean,
        required: false
    },
    rtlDirection: {
        type: Boolean,
        required: false
    },
    defaultLanguage: {
        type: String,
        required: false,
    },
    heroButtonText: {
        type: String,
        required: false,
    },
    enableNewsletter: {
        type: Boolean,
        required: false,
    },
    enableScholarshipsSearch: {
        type: Boolean,
        required: false,
    },
    footerText: {
        type: String,
        required: false,
    },
    showHeroSection: {
        type: Boolean,
        required: false,
    },
    showFeaturedScholarships: {
        type: Boolean,
        required: false,
    },
    showSearchSection: {
        type: Boolean,
        required: false,
    },
    showCategoriesSection: {
        type: Boolean,
        required: false,
    },
    showCountriesSection: {
        type: Boolean,
        required: false,
    },
    showLatestArticles: {
        type: Boolean,
        required: false,
    },
    showSuccessStories: {
        type: Boolean,
        required: false,
    },
    showNewsletterSection: {
        type: Boolean,
        required: false,
    },
    showStatisticsSection: {
        type: Boolean,
        required: false,
    },
    showPartnersSection: {
        type: Boolean,
        required: false,
    },
    heroTitle: {
        type: String,
        required: false,
    },
    heroSubtitle: {
        type: String,
        required: false,
    },
    heroDescription: {
        type: String,
        required: false,
    },
})

export interface ISiteSettings {
    _id?: string;
    siteName: string;
    siteTagline?: string;
    siteDescription?: string;
    favicon?: string;
    logo?: string;
    logoDark?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    enableDarkMode?: boolean;
    rtlDirection?: boolean;
    defaultLanguage?: string;
    heroButtonText?: string;
    enableNewsletter?: boolean;
    enableScholarshipSearch?: boolean;
    footerText?: string;
    showHeroSection?: boolean;
    showFeaturedScholarships?: boolean;
    showSearchSection?: boolean;
    showCategoriesSection?: boolean;
    showCountriesSection?: boolean;
    showLatestArticles?: boolean;
    showSuccessStories?: boolean;
    showNewsletterSection?: boolean;
    showStatisticsSection?: boolean;
    showPartnersSection?: boolean;
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
};

type SiteSettingsDocument = ISiteSettings & Document;
export const SiteSettingsModel: Model<SiteSettingsDocument> = mongoose.model<SiteSettingsDocument>('siteSettings', SiteSettingsSchema);
