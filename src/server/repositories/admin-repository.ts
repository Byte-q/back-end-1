// build admin repository
import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';

export class AdminRepository {

    async findAllScholarships(): Promise<any[]> {
        try {
            const db = await dbConnect();
      
            return await db.connection.collection('scholarships').find().sort({ createdAt: -1 }).toArray();
        } catch (error) {
            console.log("Error in Scholarships data For Adnim repository method", error)
            throw error;
        }
    }

    async findAllUsers(): Promise<any[]> {
        try {
            const db = await dbConnect();
      
            return await db.connection.collection('users').find().toArray();
        } catch (error) {
            console.log("Error in Users data For Adnim repository method", error)
            throw error;
        }
    }

    async findAllPosts(): Promise<any[]> {
    try {
      const db = await dbConnect();
      let posts = await db.connection.collection('posts').find().toArray();
      
      return posts;
    } catch (error) {
      console.error("Error in listPosts:", error);
      throw error;
    }
  }

    async findAllSuccessStories(): Promise<any[]> {
        try {
            const db = await dbConnect();
      
            return await db.connection.collection('success-stories').find().toArray();
        } catch (error) {
            console.log("Error in Success Stories data For Adnim repository method", error)
            throw error;
        }
    }
}