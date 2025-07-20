import { ObjectId, Collection } from 'mongodb';
import dbConnect from '../../lib/mongodb';

/**
 * Repository أساسي يوفر عمليات CRUD العامة
 */
export class BaseRepository<T> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  /**
   * الحصول على كافة السجلات
   */
  async findAll(filters: Record<string, any> = {}): Promise<T[]> {
    const db = await dbConnect();
    // Convert any id filter to ObjectId
    if (filters._id) {
      filters._id = new ObjectId(filters._id);
    }
    return db.collection(this.collectionName).find(filters).toArray();
  }

  /**
   * الحصول على سجل واحد بواسطة المعرف
   */
  async findById(id: string): Promise<T | undefined> {
    const db = await dbConnect();
    return db.collection(this.collectionName).findOne({ _id: new ObjectId(id) }) || undefined;
  }

  /**
   * إنشاء سجل جديد
   */
  async create(data: Partial<T>): Promise<T> {
    const db = await dbConnect();
    const result = await db.collection(this.collectionName).insertOne(data);
    return { _id: result.insertedId, ...data } as T;
  }

  /**
   * تحديث سجل موجود
   */
  async update(id: string, data: Partial<T>): Promise<T | undefined> {
    const db = await dbConnect();
    await db.collection(this.collectionName).updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return db.collection(this.collectionName).findOne({ _id: new ObjectId(id) }) || undefined;
  }

  /**
   * حذف سجل
   */
  async delete(id: string): Promise<boolean> {
    const db = await dbConnect();
    const result = await db.collection(this.collectionName).deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
