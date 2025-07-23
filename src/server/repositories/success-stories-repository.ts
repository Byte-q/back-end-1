import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';
import { ISuccessStory } from '../models/SuccessStory';

export class SuccessStoriesRepository {
  /**
   * الحصول على قصة نجاح بواسطة المعرف
   */
  async getSuccessStoryById(id: string): Promise<ISuccessStory | undefined> {
    try {
      const db = await dbConnect();
      const story = await db.connection.collection('success-stories').findOne({ _id: new ObjectId(id) }) || undefined;
      return story ? (story as ISuccessStory) : undefined;
    } catch (error) {
      console.error("Error in getSuccessStoryById:", error);
      throw error;
    }
  }

  /**
   * الحصول على قصة نجاح بواسطة الاسم المستعار
   */
  async getSuccessStoryBySlug(slug: string): Promise<ISuccessStory | undefined> {
    try {
      const db = await dbConnect();
      const story = await db.connection.collection('success-stories').findOne({ slug }) || undefined;
      return story ? (story as ISuccessStory) : undefined;
    } catch (error) {
      console.error("Error in getSuccessStoryBySlug:", error);
      throw error;
    }
  }

  /**
   * إنشاء قصة نجاح جديدة
   */
  async createSuccessStory(storyData: any): Promise<ISuccessStory> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('success-stories').insertOne(storyData);
      return { _id: result.insertedId.toString(), ...storyData };
    } catch (error) {
      console.error("Error in createSuccessStory:", error);
      throw error;
    }
  }

  /**
   * تحديث قصة نجاح
   */
  async updateSuccessStory(id: string, storyData: Partial<ISuccessStory>): Promise<ISuccessStory | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('successStories').updateOne(
        { _id: new ObjectId(id) },
        { $set: storyData }
      );
      const story = await db.connection.collection('success-stories').findOne({ _id: new ObjectId(id) }) || undefined;
      return story ? (story as ISuccessStory) : undefined;
    } catch (error) {
      console.error("Error in updateSuccessStory:", error);
      throw error;
    }
  }

  /**
   * حذف قصة نجاح
   */
  async deleteSuccessStory(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('success-stories').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteSuccessStory:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة قصص النجاح
   */
  async listSuccessStories(filters?: {
    isFeatured?: boolean,
    limit?: number
  }): Promise<ISuccessStory[]> {
    try {
      const db = await dbConnect();
      const query: any = {};
      if (filters?.isFeatured !== undefined) query.isPublished = true;
      let cursor = db.connection.collection('success-stories').find(query).sort({ createdAt: -1 });
      if (filters?.limit !== undefined && filters.limit > 0) {
        cursor = cursor.limit(filters.limit);
      }
      return await cursor.toArray();
    } catch (error) {
      console.error("Error in listSuccessStories:", error);
      throw error;
    }
  }
}
