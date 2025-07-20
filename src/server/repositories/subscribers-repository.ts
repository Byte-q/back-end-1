import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';
import { ISubscriber } from '../models/Subscriber';

/**
 * فئة مستودع المشتركين
 * تتعامل مع عمليات قاعدة البيانات المتعلقة بالمشتركين في النشرة البريدية
 */
export class SubscribersRepository {
  /**
   * الحصول على مشترك بواسطة المعرف
   */
  async getSubscriberById(id: string): Promise<ISubscriber | undefined> {
    try {
      const db = await dbConnect();
      const subscriber = await db.connection.collection('subscribers').findOne({ _id: new ObjectId(id) });
      return subscriber ? (subscriber as ISubscriber) : undefined;
    } catch (error) {
      console.error("Error in getSubscriber:", error);
      throw error;
    }
  }

  /**
   * الحصول على مشترك بواسطة البريد الإلكتروني
   */
  async getSubscriberByEmail(email: string): Promise<ISubscriber | undefined> {
    try {
      const db = await dbConnect();
      const subscriber = await db.connection.collection('subscribers').findOne({ email });
      return subscriber ? (subscriber as ISubscriber) : undefined;
    } catch (error) {
      console.error("Error in getSubscriberByEmail:", error);
      throw error;
    }
  }

  /**
   * إنشاء مشترك جديد
   */
  async createSubscriber(subscriber: any): Promise<ISubscriber> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('subscribers').insertOne(subscriber);
      return { _id: result.insertedId.toString(), ...subscriber };
    } catch (error) {
      console.error("Error in createSubscriber:", error);
      throw error;
    }
  }

  /**
   * حذف مشترك
   */
  async deleteSubscriber(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('subscribers').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteSubscriber:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بكل المشتركين
   */
  async listSubscribers(): Promise<ISubscriber[]> {
    try {
      const db = await dbConnect();
      return db.connection.collection('subscribers').find().sort({ createdAt: -1 }).toArray();
    } catch (error) {
      console.error("Error in listSubscribers:", error);
      throw error;
    }
  }
}
