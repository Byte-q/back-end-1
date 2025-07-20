import { Request, Response } from 'express';
import { SeoSettingsService } from '../services/seo-settings-service';
import { insertSeoSettingsSchema } from '../../shared/schema';

export class SeoSettingsController {
  private seoSettingsService: SeoSettingsService;

  constructor() {
    this.seoSettingsService = new SeoSettingsService();
  }

  async getSeoSettings(req: Request, res: Response): Promise<void> {
    try {
      const { pagePath } = req.params;
      const settings = await this.seoSettingsService.getSeoSettings(pagePath);
      
      res.json({
        success: true,
        data: settings,
        message: 'تم جلب إعدادات SEO بنجاح'
      });
    } catch (error) {
      console.error('Error in getSeoSettings:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب إعدادات SEO'
      });
    }
  }

  async listSeoSettings(req: Request, res: Response): Promise<void> {
    try {
      const settings = await this.seoSettingsService.listSeoSettings();
      res.json({
        success: true,
        data: settings,
        message: 'تم جلب قائمة إعدادات SEO بنجاح'
      });
    } catch (error) {
      console.error('Error in listSeoSettings:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قائمة إعدادات SEO'
      });
    }
  }

  async createSeoSettings(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertSeoSettingsSchema.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const settingsData = { ...validationResult.data, pagePath: req.body.pagePath };
      const newSettings = await this.seoSettingsService.createSeoSettings(settingsData);

      res.json({
        success: true,
        data: newSettings,
        message: 'تم إنشاء إعدادات SEO بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createSeoSettings:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء إعدادات SEO'
      });
    }
  }
  async updateSeoSettings(req: Request, res: Response): Promise<void> {
    try {
      const { pagePath } = req.params;
      const validationResult = insertSeoSettingsSchema.partial().safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const settingsData = { ...validationResult.data, pagePath };
      const updatedSettings = await this.seoSettingsService.updateSeoSettings(settingsData);
      
      res.json({
        success: true,
        data: updatedSettings,
        message: 'تم تحديث إعدادات SEO بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateSeoSettings:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في تحديث إعدادات SEO'
      });
    }
  }
  async deleteSeoSettings(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.seoSettingsService.deleteSeoSettings(id);
      res.json({
        success: true,
        message: 'تم حذف إعدادات SEO بنجاح'
      });
    } catch (error: any) {
      console.error('Error in deleteSeoSettings:', error);
    }
  }
} 