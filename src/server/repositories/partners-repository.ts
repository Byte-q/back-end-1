import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

export class PartnersRepository {
  /**
   * الحصول على شريك بواسطة المعرف
   * @param id معرف الشريك
   * @returns بيانات الشريك أو null إذا لم يكن موجوداً
   */
  async getPartnerById(id: string): Promise<any | null> {
    try {
      const db = await dbConnect();
      return (await db.connection.collection('partners').findOne({ _id: new ObjectId(id) })) || null;
    } catch (error) {
      console.error('Error in PartnersRepository.getPartnerById:', error);
      throw error;
    }
  }

  /**
   * إنشاء شريك جديد
   * @param data بيانات الشريك
   * @returns الشريك الذي تم إنشاؤه
   */
  async createPartner(data: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('partners').insertOne(data);
      return { _id: result.insertedId, ...data };
    } catch (error) {
      console.error('Error in PartnersRepository.createPartner:', error);
      throw error;
    }
  }

  /**
   * تحديث شريك موجود
   * @param id معرف الشريك
   * @param data البيانات المراد تحديثها
   * @returns الشريك المحدث أو null إذا لم يتم العثور عليه
   */
  async updatePartner(id: string, data: Partial<any>): Promise<any | null> {
    try {
      const db = await dbConnect();
      await db.connection.collection('partners').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...data, updatedAt: new Date() } }
      );
      return (await db.connection.collection('partners').findOne({ _id: new ObjectId(id) })) || null;
    } catch (error) {
      console.error('Error in PartnersRepository.updatePartner:', error);
      throw error;
    }
  }

  /**
   * حذف شريك
   * @param id معرف الشريك
   * @returns هل تمت عملية الحذف بنجاح
   */
  async deletePartner(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('partners').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error('Error in PartnersRepository.deletePartner:', error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة الشركاء
   * @param filters فلاتر البحث (اختياري)
   * @returns قائمة الشركاء
   */
  async listPartners(filters?: { isActive?: boolean }): Promise<any[]> {
    try {
      const db = await dbConnect();
      const query: any = {};
      if (filters?.isActive !== undefined) {
        query.isActive = filters.isActive;
      }
      return await db.connection.collection('partners').find(query).toArray();
    } catch (error) {
      console.error('Error in PartnersRepository.listPartners:', error);
      throw error;
    }
  }
}
