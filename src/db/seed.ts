import mongoose from 'mongoose';
import { UserModel } from '../server/models/User';
import { SuccessStoryModel } from '../server/models/SuccessStory';
import { SubscriberModel } from '../server/models/Subscriber';
import { StatisticModel } from '../server/models/Statistic';
import { SiteSettingsModel } from '../server/models/SiteSettings';
import { MediaFileModel } from '../server/models/Media';
import { MenuModel } from '../server/models/Menus';
import { PageModel } from '../server/models/Pages';
import { PostModel } from '../server/models/Posts';
import { PartnerModel } from '../server/models/Partners';
import { LevelModel } from '../server/models/Levels';
import { CountryModel } from '../server/models/Countries';
import { SeoSettingModel } from '../server/models/SeoSettings';
import { ScholarshipModel } from '../server/models/Scholarships';
import { CategoryModel } from '../server/models/Categories';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb+srv://mohaazizz01:0122Gare@cluster0.zonvekt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function seed() {
  await mongoose.connect(MONGODB_URI);

//   // Seed users
//   await UserModel.deleteMany({});
//   await UserModel.insertMany([
//     {
//       username: 'admin',
//       password: 'hashedpassword',
//       email: 'admin@example.com',
//       fullName: 'Admin User',
//       role: 'admin',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   ]);

  // Seed SuccessStories
  await SuccessStoryModel.deleteMany({});
  await SuccessStoryModel.insertMany([
    {
      name: 'Rop',
      title: 'Story One',
      slug: 'story-one',
      content: 'Rop is a student at Uopeople, studying for a Bachelor degree. He is affected by war and is looking for scholarships to continue his education.',
      university: 'Uopeople',
      country: 'US',
      degree: 'Bachlor degree',
      graduationYear: '2031',
      thumbnailUrl: 'image.png',
      studentName: 'Rop',
      scholarshipName: 'Effected By War',
      imageUrl: '',
      isPublished: true,
      createdAt: new Date(),
    }
  ]);

//   // Seed Subscribers
//   await SubscriberModel.deleteMany({});
//   await SubscriberModel.insertMany([
//     {
//       email: 'admin@exampl.com',
//       createdAt: new Date(),
//     }
//   ]);
  
//   // Seed Statistics
//   await StatisticModel.deleteMany({});
//   await StatisticModel.insertMany([
//     {
//       type: 'usersCount',
//       data: 70
//     }
//   ]);
  
  // Seed Site Settings
  // await SiteSettingsModel.deleteMany({});
  // await SiteSettingsModel.insertMany([
  //   {
  //     siteName: 'FULLSCO',
  //     siteDescription: 'A platform for scholarships and educational resources.',
  //     siteLogo: '/uploads/logo.png',
  //     siteUrl: 'https://fullsco.com',
  //     contactEmail: '',
  //     contactPhone: '',
  //     address: '',
  //     socialLinks: {
  //       facebook: 'https://facebook.com/fullsco',
  //       twitter: 'https://twitter.com/fullsco',
  //       instagram: 'https://instagram.com/fullsco',
  //       linkedin: 'https://linkedin.com/company/full-sco',
  //     },
  //     isActive: true,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     seoTitle: 'Fullsco - Scholarships and Education',
  //     seoDescription: 'Find scholarships and educational resources at Fullsco.',
  //     seoKeywords: 'scholarships, education, online courses',
  //     seoImage: '/uploads/seo-image.png',
  //     googleAnalyticsId: 'UA-123456789-1',
  //     facebookPixelId: '1234567890',
  //     twitterHandle: '@fullsco',
  //     instagramHandle: '@fullsco',
  //     linkedinUrl: 'https://www.linkedin.com/company/full-sco',
  //     youtubeUrl: 'https://www.youtube.com/channel/UC1234567890',
  //     termsOfService: 'Terms of service content goes here.',
  //     privacyPolicy: 'Privacy policy content goes here.',
  //   }
  // ]);

//   // Seed Media
//   await MediaFileModel.deleteMany({});
//   await MediaFileModel.insertMany([
//     {
//       filename: 'logo.png',
//       url: '/uploads/logo.png',
//       type: 'image/png',
//       size: 12345,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       isActive: true,
//     }
//   ]);

//   // Seed Menus
//   await MenuModel.deleteMany({});
//   await MenuModel.insertMany([
//     {
//       title: 'Main Menu',
//       slug: 'main-menu',
//       items: [
//         { label: 'Home', url: '/', isActive: true },
//         { label: 'About', url: '/about', isActive: true }
//       ],
//       isActive: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//   ]);

//   // Seed Pages
//   await PageModel.deleteMany({});
//   await PageModel.insertMany([
//     {
//       title: 'About',
//       slug: 'about',
//       content: 'About us page',
//       isPublished: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//   ]);

//   // Seed Posts
//   await PostModel.deleteMany({});
//   await PostModel.insertMany([
//     {
//       title: 'First Post',
//       slug: 'first-post',
//       content: 'Hello world',
//       authorId: 'admin',
//       status: 'published',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//   ]);

//   // Seed Partners
//   await PartnerModel.deleteMany({});
//   await PartnerModel.insertMany([
//     {
//       name: 'Partner 1',
//       isActive: true,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     }
//   ]);

//   // Seed Levels
//   await LevelModel.deleteMany({});
//   await LevelModel.insertMany([
//     {
//       name: 'Bachelor',
//       slug: 'bachelor',
//       description: 'Bachelor degree',
//     }
//   ]);

//   // Seed Countries
//   await CountryModel.deleteMany({});
//   await CountryModel.insertMany([
//     {
//       name: 'United States',
//       slug: 'us',
//       flagUrl: '/flags/us.png',
//     }
//   ]);

//   // Seed SeoSettings
//   await SeoSettingModel.deleteMany({});
//   await SeoSettingModel.insertMany([
//     {
//       pagePath: '/about',
//       metaTitle: 'About Us',
//       metaDescription: 'Learn more about us',
//       ogImage: '/uploads/about-og.png',
//       keywords: 'about,company,info',
//     }
//   ]);

//   // Seed Scholarships
  // await ScholarshipModel.deleteMany({});
  // await ScholarshipModel.insertMany([
  //   {
  //     title: 'Sample Scholarship',
  //     slug: 'sample-scholarship',
  //     description: 'A sample scholarship for demonstration.',
  //     content: 'Full details about the scholarship.',
  //     deadline: '2024-12-31',
  //     amount: '10000',
  //     currency: 'USD',
  //     university: 'Sample University',
  //     department: 'Engineering',
  //     website: 'https://sampleuniversity.edu',
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     isFeatured: true,
  //     isFullyFunded: false,
  //     isPublished: true,
  //     seoTitle: 'Sample Scholarship SEO',
  //     seoDescription: 'SEO description for sample scholarship.',
  //     seoKeywords: 'scholarship,engineering,2024',
  //     focusKeyword: 'engineering scholarship',
  //     countryId: '',
  //     levelId: '',
  //     categoryId: '',
  //     requirements: 'Sample requirements',
  //     applicationLink: 'https://apply.sampleuniversity.edu',
  //     imageUrl: '/uploads/scholarship.png',
  //     views: 0,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }
  // ]);

//   // Seed Categories
//   await CategoryModel.deleteMany({});
//   await CategoryModel.insertMany([
//     {
//       name: 'Engineering',
//       slug: 'engineering',
//       description: 'Engineering related scholarships and posts.'
//     }
//   ]);

  console.log('Seeding done!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

