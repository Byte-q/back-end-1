import { NextFunction, Request, Response } from 'express';
import { MediaService } from '../services/media-service';
import { insertMediaFileSchema } from '../../shared/schema';

export class MediaController {
  private mediaService: MediaService;

  constructor() {
    this.mediaService = new MediaService();
  }

  async getMediaFiles(req: Request, res: Response): Promise<void> {
    try {
      const mediaFiles = await this.mediaService.listMediaFiles();
      res.json({
        success: true,
        data: mediaFiles,
        message: 'تم جلب ملفات الوسائط بنجاح'
      });
    } catch (error) {
      console.error('Error in getMediaFiles:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب ملفات الوسائط'
      });
    }
  }

  async getMediaFile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mediaFile = await this.mediaService.getMediaFile(id);
      res.json({
        success: true,
        data: mediaFile,
        message: 'تم جلب ملف الوسائط بنجاح'
      });
    } catch (error) {
      console.error('Error in getMediaFile:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب ملف الوسائط',
      });
    }
  }

  async listMediaFiles(req: Request, res: Response): Promise<void> {
    try {
      const mediaFiles = await this.mediaService.listMediaFiles();
      res.json({
        success: true,
        data: mediaFiles,
        message: 'تم جلب ملفات الوسائط بنجاح'
      });
    } catch (error) {
      console.error('Error in listMediaFiles:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب ملفات الوسائط',
      });
    }
  }

  async bulkDeleteMediaFiles(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.body;
      const deleted = await this.mediaService.bulkDeleteMediaFiles(ids);
      res.json({
        success: true,
        message: 'تم حذف الملفات بنجاح'
      });
    } catch (error) {
      console.error('Error in bulkDeleteMediaFiles:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الملفات',
      });
    }
  }



  async uploadMediaFile(req: Request, res: Response): Promise<void> {
    try {
      // التحقق من وجود ملف في الطلب
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'لم يتم رفع أي ملف'
        });
        return;
      }

      const fileData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        url: `/uploads/${req.file.filename}`
      };

      const validationResult = insertMediaFileSchema.safeParse(fileData);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات الملف غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const mediaFileData = validationResult.data;
      const newMediaFile = await this.mediaService.createMediaFile(mediaFileData);
      
      res.status(201).json({
        success: true,
        data: newMediaFile,
        message: 'تم رفع الملف بنجاح'
      });
    } catch (error: any) {
      console.error('Error in uploadMediaFile:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في رفع الملف'
      });
    }
  }

  async updateMediaFile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mediaFile = await this.mediaService.updateMediaFile(id, req.body);
      res.json({
        success: true,
        data: mediaFile,
        message: 'تم تحديث الملف بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateMediaFile:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في تحديث الملف'
      });
    }
  }

  async deleteMediaFile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mediaFileId = id;
      
      if (!mediaFileId) {
        res.status(400).json({
          success: false,
          message: 'معرف الملف غير صحيح'
        });
        return;
      }

      const deleted = await this.mediaService.deleteMediaFile(mediaFileId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'الملف غير موجود'
        });
        return;
      }

      res.json({
        success: true,
        message: 'تم حذف الملف بنجاح'
      });
    } catch (error) {
      console.error('Error in deleteMediaFile:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الملف'
      });
    }
  }
} 