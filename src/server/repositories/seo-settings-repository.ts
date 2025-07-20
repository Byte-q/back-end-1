import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

/**
 * فئة مستودع إعدادات SEO
 * تتعامل مع عمليات قاعدة البيانات المتعلقة بإعدادات تحسين محركات البحث
 */
export class SeoSettingsRepository {
  /**
   * الحصول على إعداد SEO بواسطة المعرف
   */
  async getSeoSetting(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('seoSettings').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in getSeoSetting:", error);
      throw error;
    }
  }

  /**
   * الحصول على إعداد SEO بواسطة مسار الصفحة
   */
  async getSeoSettingByPath(pagePath: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('seoSettings').findOne({ pagePath });
    } catch (error) {
      console.error("Error in getSeoSettingByPath:", error);
      throw error;
    }
  }

  /**
   * إنشاء إعداد SEO جديد
   */
  async createSeoSetting(seoSetting: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('seoSettings').insertOne(seoSetting);
      return { _id: result.insertedId, ...seoSetting };
    } catch (error) {
      console.error("Error in createSeoSetting:", error);
      throw error;
    }
  }

  /**
   * تحديث إعداد SEO موجود
   */
  async updateSeoSetting(id: string, seoSetting: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('seoSettings').updateOne(
        { _id: new ObjectId(id) },
        { $set: seoSetting }
      );
      return db.connection.collection('seoSettings').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in updateSeoSetting:", error);
      throw error;
    }
  }

  /**
   * حذف إعداد SEO
   */
  async deleteSeoSetting(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('seoSettings').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteSeoSetting:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بكل إعدادات SEO
   */
  async listSeoSettings(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return db.connection.collection('seoSettings').find().toArray();
    } catch (error) {
      console.error("Error in listSeoSettings:", error);
      throw error;
    }
  }
}
