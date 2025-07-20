import { Request, Response } from 'express';
import { SiteSettingsService } from '../services/site-settings-service';
import { insertSiteSettingsSchema } from '../../shared/schema';

export class SiteSettingsController {
  private siteSettingsService: SiteSettingsService;

  constructor() {
    this.siteSettingsService = new SiteSettingsService();
  }

  async getSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      const settings = await this.siteSettingsService.getSiteSettings();
      res.json({
        success: true,
        data: settings,
        message: 'تم جلب إعدادات الموقع بنجاح'
      });
    } catch (error) {
      console.error('Error in getSiteSettings:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب إعدادات الموقع'
      });
    }
  }

  async updateSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertSiteSettingsSchema.partial().safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const settingsData = validationResult.data;
      const updatedSettings = await this.siteSettingsService.updateSiteSettings(settingsData);
      
      res.json({
        success: true,
        data: updatedSettings,
        message: 'تم تحديث إعدادات الموقع بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateSiteSettings:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في تحديث إعدادات الموقع'
      });
    }
  }
} 