import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

/**
 * مستودع البيانات للتعامل مع الدول في قاعدة البيانات
 */
export class CountriesRepository {
  /**
   * الحصول على قائمة بجميع الدول
   * @returns قائمة الدول
   */
  async findAll(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('countries').find().sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error in findAll countries repository method:", error);
      throw error;
    }
  }

  /**
   * الحصول على دولة محددة بواسطة المعرف
   * @param id معرف الدولة
   * @returns بيانات الدولة أو undefined في حالة عدم وجودها
   */
  async findById(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('countries').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error(`Error in findById countries repository method for id ${id}:`, error);
      throw error;
    }
  }

  /**
   * الحصول على دولة بواسطة الاسم المستعار (slug)
   * @param slug الاسم المستعار للدولة
   * @returns بيانات الدولة أو undefined في حالة عدم وجودها
   */
  async findBySlug(slug: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('countries').findOne({ slug }) || undefined;
    } catch (error) {
      console.error(`Error in findBySlug countries repository method for slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * إنشاء دولة جديدة
   * @param data بيانات الدولة الجديدة
   * @returns الدولة التي تم إنشاؤها
   */
  async create(data: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('countries').insertOne(data);
      return { _id: result.insertedId, ...data };
    } catch (error) {
      console.error("Error in create countries repository method:", error);
      throw error;
    }
  }

  /**
   * تحديث دولة موجودة
   * @param id معرف الدولة
   * @param data البيانات المراد تحديثها
   * @returns الدولة بعد التحديث أو undefined في حالة عدم وجودها
   */
  async update(id: string, data: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      const existing = await this.findById(id);
      if (!existing) {
        return undefined;
      }
      await db.connection.collection('countries').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      return db.connection.collection('countries').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error(`Error in update countries repository method for id ${id}:`, error);
      throw error;
    }
  }

  /**
   * حذف دولة
   * @param id معرف الدولة
   * @returns true إذا تم الحذف بنجاح، false إذا لم يتم العثور على الدولة
   */
  async delete(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const existing = await this.findById(id);
      if (!existing) {
        return false;
      }
      const result = await db.connection.collection('countries').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error(`Error in delete countries repository method for id ${id}:`, error);
      throw error;
    }
  }
}
