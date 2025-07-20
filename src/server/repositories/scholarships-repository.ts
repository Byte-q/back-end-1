import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

export class ScholarshipsRepository {
  /**
   * الحصول على منحة دراسية بواسطة المعرف
   */
  async getScholarshipById(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('scholarships').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error("Error in getScholarshipById:", error);
      return undefined;
    }
  }

  /**
   * الحصول على منحة دراسية بواسطة الاسم المستعار
   */
  async getScholarshipBySlug(slug: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('scholarships').findOne({ slug }) || undefined;
    } catch (error) {
      console.error("Error in getScholarshipBySlug:", error);
      return undefined;
    }
  }

  /**
   * إنشاء منحة دراسية جديدة
   */
  async createScholarship(scholarshipData: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('scholarships').insertOne(scholarshipData);
      return { _id: result.insertedId, ...scholarshipData };
    } catch (error) {
      console.error("Error in createScholarship:", error);
      throw error;
    }
  }

  /**
   * تحديث منحة دراسية
   */
  async updateScholarship(id: string, scholarshipData: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('scholarships').updateOne(
        { _id: new ObjectId(id) },
        { $set: scholarshipData }
      );
      return db.connection.collection('scholarships').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error("Error in updateScholarship:", error);
      throw error;
    }
  }

  /**
   * حذف منحة دراسية
   */
  async deleteScholarship(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('scholarships').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteScholarship:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة المنح الدراسية
   * يمكن تصفية النتائج حسب المعايير المقدمة
   */
  async listScholarships(filters?: {
    isFeatured?: boolean,
    countryId?: string,
    levelId?: string,
    categoryId?: string,
    isPublished?: boolean
  }): Promise<any[]> {
    try {
      const db = await dbConnect();
      const query: any = {};
      if (filters?.isFeatured !== undefined) query.isFeatured = filters.isFeatured;
      if (filters?.countryId) query.countryId = new ObjectId(filters.countryId);
      if (filters?.levelId) query.levelId = new ObjectId(filters.levelId);
      if (filters?.categoryId) query.categoryId = new ObjectId(filters.categoryId);
      if (filters?.isPublished !== undefined) query.isPublished = filters.isPublished;
      return await db.connection.collection('scholarships').find(query).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      console.error("Error in listScholarships:", error);
      throw error;
    }
  }

  /**
   * الحصول على المنح الدراسية المميزة
   */
  async getFeaturedScholarships(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('scholarships').find({ isFeatured: true }).sort({ createdAt: -1 }).limit(10).toArray();
    } catch (error) {
      console.error("Error in getFeaturedScholarships:", error);
      return [];
    }
  }

  /**
   * زيادة عدد مشاهدات منحة دراسية
   */
  async incrementScholarshipViews(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const scholarship = await this.getScholarshipById(id);
      if (!scholarship) {
        return false;
      }
      const currentViews = typeof scholarship.views === 'number' ? scholarship.views : 0;
      const result = await db.connection.collection('scholarships').updateOne(
        { _id: new ObjectId(id) },
        { $set: { views: currentViews + 1 } }
      );
      return result.modifiedCount === 1;
    } catch (error) {
      console.error("Error in incrementScholarshipViews:", error);
      return false;
    }
  }
}
