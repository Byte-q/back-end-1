import { ObjectId } from 'mongodb';
import dbConnect from '../..//lib/mongodb';
import { CategoryModel } from '../models/Categories';

/**
 * مستودع البيانات للتعامل مع الفئات في قاعدة البيانات
 */
export class CategoriesRepository {
  /**
   * الحصول على قائمة بجميع الفئات
   * @returns قائمة الفئات
   */
  async findAll(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('categories').find().sort({ name: 1 }).toArray();
    } catch (error) {
      console.error("Error in findAll categories repository method:", error);
      throw error;
    }
  }

  /**
   * الحصول على فئة محددة بواسطة المعرف
   * @param id معرف الفئة
   * @returns بيانات الفئة أو undefined في حالة عدم وجودها
   */
  async findById(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('categories').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error(`Error in findById categories repository method for id ${id}:`, error);
      throw error;
    }
  }

  /**
   * الحصول على فئة بواسطة الاسم المستعار (slug)
   * @param slug الاسم المستعار للفئة
   * @returns بيانات الفئة أو undefined في حالة عدم وجودها
   */
  async findBySlug(slug: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('categories').findOne({ slug }) || undefined;
    } catch (error) {
      console.error(`Error in findBySlug categories repository method for slug ${slug}:`, error);
      throw error;
    }
  }

  /**
   * إنشاء فئة جديدة
   * @param data بيانات الفئة الجديدة
   * @returns الفئة التي تم إنشاؤها
   */
  async create(data: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('categories').insertOne(data);
      return { _id: result.insertedId, ...data };
    } catch (error) {
      console.error("Error in create categories repository method:", error);
      throw error;
    }
  }

  /**
   * تحديث فئة موجودة
   * @param id معرف الفئة
   * @param data البيانات المراد تحديثها
   * @returns الفئة بعد التحديث أو undefined في حالة عدم وجودها
   */
  async update(id: string, data: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      const existing = await this.findById(id);
      if (!existing) {
        return undefined;
      }
      await db.connection.collection('categories').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      return db.connection.collection('categories').findOne({ _id: new ObjectId(id) }) || undefined;
    } catch (error) {
      console.error(`Error in update categories repository method for id ${id}:`, error);
      throw error;
    }
  }

  /**
   * حذف فئة
   * @param id معرف الفئة
   * @returns true إذا تم الحذف بنجاح، false إذا لم يتم العثور على الفئة
   */
  async delete(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const existing = await this.findById(id);
      if (!existing) {
        return false;
      }
      const result = await db.connection.collection('categories').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error(`Error in delete categories repository method for id ${id}:`, error);
      throw error;
    }
  }
}
