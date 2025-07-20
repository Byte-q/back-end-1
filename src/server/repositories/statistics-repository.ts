import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';
import { IStatistic, StatisticModel } from '../models/Statistic';

export class StatisticsRepository {
  /**
   * الحصول على إحصائية بواسطة المعرف
   */
  async getStatistics(id: string): Promise<IStatistic | undefined> {
    try {
      const db = await dbConnect();
      const statistic = await db.connection.collection('statistics').findOne({ _id: new ObjectId(id) }) || undefined;
      return statistic ? (statistic as IStatistic) : undefined;
    } catch (error) {
      console.error("خطأ في الحصول على الإحصائية:", error);
      throw error;
    }
  }

  async getStatisticByType(type: string): Promise<IStatistic | undefined> {
    try {
      const db = await dbConnect();
      const statistic = await db.connection.collection('statistics').findOne({ title: type }) || undefined;
      return statistic ? (statistic as IStatistic) : undefined;
    } catch (error) {
      console.error("خطأ في الحصول على الإحصائية بواسطة النوع:", error);
      throw error;
    }
  }

  /**
   * إنشاء إحصائية جديدة
   */
  async createStatistic(data: any): Promise<IStatistic> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('statistics').insertOne(data);
      return { _id: result.insertedId.toString(), ...data };
    } catch (error) {
      console.error("خطأ في إنشاء إحصائية جديدة:", error);
      throw error;
    }
  }

  /**
   * تحديث إحصائية موجودة
   */
  async updateStatistics(id: string, data: Partial<IStatistic>): Promise<IStatistic | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('statistics').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      const statistic = db.connection.collection('statistics').findOne({ _id: new ObjectId(id) }) || undefined;
      return statistic ? (statistic as IStatistic) : undefined;
    } catch (error) {
      console.error("خطأ في تحديث الإحصائية:", error);
      throw error;
    }
  }

  /**
   * حذف إحصائية
   */
  async deleteStatistic(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('statistics').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("خطأ في حذف الإحصائية:", error);
      throw error;
    }
  }

  /**
   * الحصول على جميع الإحصائيات
   */
  async listStatistics(): Promise<IStatistic[]> {
    try {
      const db = await dbConnect();
      return await db.connection.collection('statistics').find().sort({ order: 1 }).toArray();
    } catch (error) {
      console.error("خطأ في جلب قائمة الإحصائيات:", error);
      throw error;
    }
  }
}
