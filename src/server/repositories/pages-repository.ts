import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

/**
 * فئة مستودع الصفحات
 * تتعامل مع عمليات قاعدة البيانات المتعلقة بالصفحات
 */
export class PagesRepository {
  /**
   * الحصول على صفحة بواسطة المعرف
   */
  async getPage(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('pages').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in getPage:", error);
      throw error;
    }
  }

  async getAllPages(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return db.connection.collection('pages').find().toArray();
    } catch (error) {
      console.error("Error in getAllPages:", error);
      throw error;
    }
  }

  /**
   * الحصول على صفحة بواسطة slug
   */
  async getPageBySlug(slug: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('pages').findOne({ slug });
    } catch (error) {
      console.error("Error in getPageBySlug:", error);
      throw error;
    }
  }

  async getPageById(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('pages').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in getPageById:", error);
      throw error;
    }
  }

  /**
   * إنشاء صفحة جديدة
   */
  async createPage(page: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('pages').insertOne(page);
      return { _id: result.insertedId, ...page };
    } catch (error) {
      console.error("Error in createPage:", error);
      throw error;
    }
  }

  /**
   * تحديث صفحة موجودة
   */
  async updatePage(id: string, page: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('pages').updateOne(
        { _id: new ObjectId(id) },
        { $set: page }
      );
      return db.connection.collection('pages').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in updatePage:", error);
      throw error;
    }
  }

  /**
   * حذف صفحة
   */
  async deletePage(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('pages').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deletePage:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بكل الصفحات
   * يمكن تحديد تصفية حسب حالة النشر والظهور في الهيدر والفوتر
   */
  async listPages(filters?: { isPublished?: boolean, showInHeader?: boolean, showInFooter?: boolean }): Promise<any[]> {
    try {
      const db = await dbConnect();
      const query: any = {};
      if (filters) {
        if (filters.isPublished !== undefined) query.isPublished = filters.isPublished;
        if (filters.showInHeader !== undefined) query.showInHeader = filters.showInHeader;
        if (filters.showInFooter !== undefined) query.showInFooter = filters.showInFooter;
      }
      return db.connection.collection('pages').find(query).sort({ updatedAt: -1 }).toArray();
    } catch (error) {
      console.error("Error in listPages:", error);
      throw error;
    }
  }
}
