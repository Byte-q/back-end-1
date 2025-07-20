import { Request, Response } from 'express';
import { PagesService } from '../services/pages-service';
import { insertPageSchema } from '../../shared/schema';

export class PagesController {
  private pagesService: PagesService;

  constructor() {
    this.pagesService = new PagesService();
  }

  async getPages(req: Request, res: Response): Promise<void> {
    try {
      const pages = await this.pagesService.getAllPages();
      res.json({
        success: true,
        data: pages,
        message: 'تم جلب الصفحات بنجاح'
      });
    } catch (error) {
      console.error('Error in getPages:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الصفحات'
      });
    }
  }

  async getPageBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const page = await this.pagesService.getPageBySlug(slug);
      
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'الصفحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: page,
        message: 'تم جلب بيانات الصفحة بنجاح'
      });
    } catch (error) {
      console.error('Error in getPageBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات الصفحة'
      });
    }
  }

  async createPage(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertPageSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const pageData = validationResult.data;
      const newPage = await this.pagesService.createPage(pageData);
      
      res.status(201).json({
        success: true,
        data: newPage,
        message: 'تم إنشاء الصفحة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createPage:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء الصفحة'
      });
    }
  }

  async listPages(req: Request, res: Response): Promise<void> {
    try {
      const pages = await this.pagesService.getAllPages();
      res.json({
        success: true,
        data: pages,
        message: 'تم جلب الصفحات بنجاح'
      });
    } catch (error) {
      console.error('Error in listPages:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الصفحات'
      });
    }
  }

  async getPage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pageId = id;
      
      if (!pageId) {
        res.status(400).json({
          success: false,
          message: 'معرف الصفحة غير صحيح'
        });
        return;
      }

      const page = await this.pagesService.getPageById(pageId);
      
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'الصفحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: page,
        message: 'تم جلب بيانات الصفحة بنجاح'
      });
    } catch (error) {
      console.error('Error in getPage:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات الصفحة'
      });
    }
  }

  async updatePage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pageId = id;
      
      if (!pageId) {
        res.status(400).json({
          success: false,
          message: 'معرف الصفحة غير صحيح'
        });
        return;
      }

      const validationResult = insertPageSchema.partial().safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const pageData = validationResult.data;
      const updatedPage = await this.pagesService.updatePage(pageId, pageData);
      
      if (!updatedPage) {
        res.status(404).json({
          success: false,
          message: 'الصفحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: updatedPage,
        message: 'تم تحديث الصفحة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updatePage:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في تحديث الصفحة'
      });
    }
  }

  async deletePage(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pageId = id;
      
      if (!pageId) {
        res.status(400).json({
          success: false,
          message: 'معرف الصفحة غير صحيح'
        });
        return;
      }

      const deleted = await this.pagesService.deletePage(pageId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'الصفحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        message: 'تم حذف الصفحة بنجاح'
      });
    } catch (error) {
      console.error('Error in deletePage:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الصفحة'
      });
    }
  }
} 