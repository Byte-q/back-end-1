import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

/**
 * فئة مستودع الوسائط
 * تتعامل مع عمليات قاعدة البيانات المتعلقة بملفات الوسائط
 */
export class MediaRepository {
  /**
   * الحصول على ملف وسائط بواسطة المعرف
   */
  async getMediaFile(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('mediaFiles').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in getMediaFile:", error);
      throw error;
    }
  }

  /**
   * إنشاء ملف وسائط جديد
   */
  async createMediaFile(mediaFile: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('mediaFiles').insertOne(mediaFile);
      return { _id: result.insertedId, ...mediaFile };
    } catch (error) {
      console.error("Error in createMediaFile:", error);
      throw error;
    }
  }

  /**
   * تحديث ملف وسائط موجود
   */
  async updateMediaFile(id: string, mediaFile: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('mediaFiles').updateOne(
        { _id: new ObjectId(id) },
        { $set: mediaFile }
      );
      return db.connection.collection('mediaFiles').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in updateMediaFile:", error);
      throw error;
    }
  }

  /**
   * حذف ملف وسائط
   */
  async deleteMediaFile(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('mediaFiles').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteMediaFile:", error);
      throw error;
    }
  }

  /**
   * حذف مجموعة من ملفات الوسائط
   */
  async bulkDeleteMediaFiles(ids: string[]): Promise<boolean> {
    try {
      if (!ids.length) {
        return false;
      }
      const db = await dbConnect();
      const objectIds = ids.map(id => new ObjectId(id));
      const result = await db.connection.collection('mediaFiles').deleteMany({ _id: { $in: objectIds } });
      return result.deletedCount !== null && result.deletedCount > 0;
    } catch (error) {
      console.error("Error in bulkDeleteMediaFiles:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بكل ملفات الوسائط
   * يمكن تصفية النتائج حسب نوع الملف
   */
  async listMediaFiles(filters?: { mimeType?: string }): Promise<any[]> {
    try {
      const db = await dbConnect();
      const query: any = {};
      if (filters && filters.mimeType) {
        query.mimeType = { $regex: `^${filters.mimeType}` };
      }
      return db.connection.collection('mediaFiles').find(query).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      console.error("Error in listMediaFiles:", error);
      throw error;
    }
  }
}
