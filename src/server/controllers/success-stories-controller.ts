import { Request, Response } from 'express';
import { SuccessStoriesService } from '../services/success-stories-service';
import { insertSuccessStory } from '../../shared/schema';

export class SuccessStoriesController {
  private successStoriesService: SuccessStoriesService;

  constructor() {
    this.successStoriesService = new SuccessStoriesService();
  }

  async listSuccessStories(req: Request, res: Response): Promise<void> {
    try {
      const stories = await this.successStoriesService.getAllSuccessStories();
      res.json({
        success: true,
        data: stories,
        total: stories.length,
        page: 1,
        limit: stories.length,
        totalPages: 1,
        message: 'تم جلب قصص النجاح بنجاح'
      });
    } catch (error) {
      console.error('Error in listSuccessStories:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قصص النجاح'
      });
    }
  }

  async getSuccessStoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const story = await this.successStoriesService.getSuccessStoryById(id);
      res.json({
        success: true,
        data: story,
        message: 'تم جلب بيانات قصة النجاح بنجاح'
      });
    } catch (error) {
      console.error('Error in getSuccessStoryById:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات قصة النجاح'
      });
    }
  }

  async updateSuccessStory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const story = await this.successStoriesService.updateSuccessStory(id, req.body);
      res.json({
        success: true,
        data: story,
        message: 'تم تحديث بيانات قصة النجاح بنجاح'
      });
    } catch (error) {
      console.error('Error in updateSuccessStory:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث بيانات قصة النجاح'
      });
    }
  }

  async deleteSuccessStory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const story = await this.successStoriesService.deleteSuccessStory(id);
      res.json({
        success: true,
        data: story,
        message: 'تم حذف قصة النجاح بنجاح'
      });
    } catch (error) {
      console.error('Error in deleteSuccessStory:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف قصة النجاح'
      });
    }
  }

  async getSuccessStoryBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const story = await this.successStoriesService.getSuccessStoryBySlug(slug);
      
      if (!story) {
        res.status(404).json({
          success: false,
          message: 'قصة النجاح غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: story,
        message: 'تم جلب بيانات قصة النجاح بنجاح'
      });
    } catch (error) {
      console.error('Error in getSuccessStoryBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات قصة النجاح'
      });
    }
  }

  async createSuccessStory(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertSuccessStory.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const storyData = {
        ...validationResult.data,
        scholarshipName: validationResult.data.scholarshipName ?? ""
      };
      const newStory = await this.successStoriesService.createSuccessStory(storyData);
      
      res.status(201).json({
        success: true,
        data: newStory,
        message: 'تم إنشاء قصة النجاح بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createSuccessStory:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء قصة النجاح'
      });
    }
  }
} 