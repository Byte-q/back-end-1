import { Request, Response } from 'express';
import { LevelsService } from '../services/levels-service';
import { insertLevelSchema } from '../../shared/schema';

export class LevelsController {
  private levelsService: LevelsService;

  constructor() {
    this.levelsService = new LevelsService();
  }

  async listLevels(req: Request, res: Response): Promise<void> {
    try {
      const levels = await this.levelsService.getAllLevels();
      res.json({
        success: true,
        data: levels,
        message: 'تم جلب قائمة المستويات بنجاح'
      });
    } catch (error) {
      console.error('Error in listLevels:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قائمة المستويات'
      });
    }
  }

  async getLevelById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const level = await this.levelsService.getLevelById(id);
      res.json({
        success: true,
        data: level,
        message: 'تم جلب بيانات المستوى بنجاح'
      });
    } catch (error) {
    }
  }

  async updateLevel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const levelData = req.body;
      const updatedLevel = await this.levelsService.updateLevel(id, levelData);
      res.json({
        success: true,
        data: updatedLevel,
        message: 'تم تحديث بيانات المستوى بنجاح'
      });
    } catch (error) {
    }
  } 

  async deleteLevel(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.levelsService.deleteLevel(id);
      res.json({
        success: true,
        message: 'تم حذف المستوى بنجاح'
      });
    } catch (error) {
      console.error('Error in deleteLevel:', error);
    }
  }

  async getLevelBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const level = await this.levelsService.getLevelBySlug(slug);
      
      if (!level) {
        res.status(404).json({
          success: false,
          message: 'المستوى غير موجود'
        });
        return;
      }

      res.json({
        success: true,
        data: level,
        message: 'تم جلب بيانات المستوى بنجاح'
      });
    } catch (error) {
      console.error('Error in getLevelBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات المستوى'
      });
    }
  }

  async createLevel(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertLevelSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const levelData = validationResult.data;
      const newLevel = await this.levelsService.createLevel(levelData);
      
      res.status(201).json({
        success: true,
        data: newLevel,
        message: 'تم إنشاء المستوى بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createLevel:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء المستوى'
      });
    }
  }
} 