import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

/**
 * مستودع البيانات للتعامل مع المستويات في قاعدة البيانات
 */
export class LevelsRepository {
  /**
   * الحصول على قائمة بجميع المستويات
   * @returns قائمة المستويات
   */
  async findAll(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('levels').find().sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error in findAll levels repository method:", error);
      throw error;
    }
  }

  /**
   * الحصول على مستوى محدد بواسطة المعرف
   * @param id معرف المستوى
   * @returns بيانات المستوى أو undefined في حالة عدم وجوده
   */
  async findById(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('levels').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error(`Error in findById levels repository method for id ${id}:`, error);
      throw error;
    }
  }

  /**
   * الحصول على مستوى بواسطة الاسم المستعار (slug)
   * @param slug الاسم المستعار للمستوى
   * @returns بيانات المستوى أو undefined في حالة عدم وجوده
   */
  async findBySlug(slug: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('levels').findOne({ slug }) || undefined;
    } catch (error) {
      console.error(`Error in findBySlug levels repository method for slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * إنشاء مستوى جديد
   * @param data بيانات المستوى الجديد
   * @returns المستوى الذي تم إنشاؤه
   */
  async create(data: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('levels').insertOne(data);
      return { _id: result.insertedId, ...data };
    } catch (error) {
      console.error("Error in create levels repository method:", error);
      throw error;
    }
  }

  /**
   * تحديث مستوى موجود
   * @param id معرف المستوى
   * @param data البيانات المراد تحديثها
   * @returns المستوى بعد التحديث أو undefined في حالة عدم وجوده
   */
  async update(id: string, data: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      const existing = await this.findById(id);
      if (!existing) {
        return undefined;
      }
      await db.connection.collection('levels').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      return db.connection.collection('levels').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error(`Error in update levels repository method for id ${id}:`, error);
      throw error;
    }
  }

  /**
   * حذف مستوى
   * @param id معرف المستوى
   * @returns true إذا تم الحذف بنجاح، false إذا لم يتم العثور على المستوى
   */
  async delete(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const existing = await this.findById(id);
      if (!existing) {
        return false;
      }
      const result = await db.connection.collection('levels').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error(`Error in delete levels repository method for id ${id}:`, error);
      throw error;
    }
  }
}
