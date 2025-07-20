import dbConnect from '../../lib/mongodb';
import { ISiteSettings } from '../models/SiteSettings';

export class SiteSettingsRepository {
  /**
   * الحصول على إعدادات الموقع
   * ملاحظة: هناك سجل واحد فقط في جدول إعدادات الموقع
   */
  async getSiteSettings(): Promise<ISiteSettings | undefined> {
    try {
      const db = await dbConnect();
      // الحصول على السجل الأول (والوحيد) من مجموعة الإعدادات
      const siteSettings = await db.connection.collection('siteSettings').findOne();
      return siteSettings ? (siteSettings as ISiteSettings) : undefined;
    } catch (error) {
      console.error("خطأ في الحصول على إعدادات الموقع:", error);
      throw error;
    }
  }

  /**
   * تحديث إعدادات الموقع
   * ملاحظة: هناك سجل واحد فقط في جدول إعدادات الموقع
   */
  async updateSiteSettings(data: Partial<ISiteSettings>): Promise<ISiteSettings> {
    try {
      const db = await dbConnect();
      // التحقق من وجود إعدادات
      const existingSettings = await this.getSiteSettings();
      if (!existingSettings) {
        // Provide default values for required fields
        const defaultData = {
          siteName: data.siteName || 'Default Site Name',
          ...data
        };
        // إذا لم تكن هناك إعدادات، قم بإنشائها
        const result = await db.connection.collection('siteSettings').insertOne(defaultData);
        return { _id: result.insertedId, ...defaultData };
      }
      // تحديث الإعدادات الموجودة
      await db.connection.collection('siteSettings').updateOne(
        { _id: existingSettings._id },
        { $set: data }
      );
      return db.connection.collection('siteSettings').findOne({ _id: existingSettings._id });
    } catch (error) {
      console.error("خطأ في تحديث إعدادات الموقع:", error);
      throw error;
    }
  }
}
