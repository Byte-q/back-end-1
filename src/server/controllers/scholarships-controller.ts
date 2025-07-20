import { Request, Response } from 'express';
import { ScholarshipsService } from '../services/scholarships-service';
import { insertScholarshipSchema } from '../../shared/schema';

export class ScholarshipsController {
  private scholarshipsService: ScholarshipsService;

  constructor() {
    this.scholarshipsService = new ScholarshipsService();
  }

  /**
   * الحصول على قائمة المنح الدراسية
   */
  async listScholarships(req: Request, res: Response): Promise<void> {
    try {
      const { page = '1', limit = '10', category, country, level, search } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      
      const scholarships = await this.scholarshipsService.getAllScholarships();
      
      res.json({
        success: true,
        data: scholarships,
        message: 'تم جلب المنح الدراسية بنجاح'
      });
    } catch (error) {
      console.error('Error in listScholarships:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب المنح الدراسية'
      });
    }
  }

  /**
   * الحصول على المنح المميزة
   */
  async getFeaturedScholarships(req: Request, res: Response): Promise<void> {
    try {
      const scholarships = await this.scholarshipsService.getFeaturedScholarships();
      
      res.json({
        success: true,
        data: scholarships,
        message: 'تم جلب المنح المميزة بنجاح'
      });
    } catch (error) {
      console.error('Error in getFeaturedScholarships:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب المنح المميزة'
      });
    }
  }

  /**
   * الحصول على منحة دراسية بواسطة المعرف
   */
  async getScholarshipById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scholarshipId = id;
      
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'معرف المنحة غير صحيح'
        });
        return;
      }

      const scholarship = await this.scholarshipsService.getScholarshipById(scholarshipId);
      
      if (!scholarship) {
        res.status(404).json({
          success: false,
          message: 'المنحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: scholarship,
        message: 'تم جلب بيانات المنحة بنجاح'
      });
    } catch (error) {
      console.error('Error in getScholarshipById:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات المنحة'
      });
    }
  }

  /**
   * الحصول على منحة دراسية بواسطة الرابط المختصر
   */
  async getScholarshipBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const scholarship = await this.scholarshipsService.getScholarshipBySlug(slug);
      
      if (!scholarship) {
        res.status(404).json({
          success: false,
          message: 'المنحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: scholarship,
        message: 'تم جلب بيانات المنحة بنجاح'
      });
    } catch (error) {
      console.error('Error in getScholarshipBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات المنحة'
      });
    }
  }

  /**
   * إنشاء منحة دراسية جديدة
   */
  async createScholarship(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertScholarshipSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const scholarshipData = validationResult.data;
      const newScholarship = await this.scholarshipsService.createScholarship(scholarshipData);
      
      res.status(201).json({
        success: true,
        data: newScholarship,
        message: 'تم إنشاء المنحة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createScholarship:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء المنحة'
      });
    }
  }

  /**
   * تحديث منحة دراسية
   */
  async updateScholarship(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scholarshipId = id;
      
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'معرف المنحة غير صحيح'
        });
        return;
      }

      const validationResult = insertScholarshipSchema.partial().safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const scholarshipData = validationResult.data;
      const updatedScholarship = await this.scholarshipsService.updateScholarship(scholarshipId, scholarshipData);
      
      if (!updatedScholarship) {
        res.status(404).json({
          success: false,
          message: 'المنحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: updatedScholarship,
        message: 'تم تحديث المنحة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateScholarship:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في تحديث المنحة'
      });
    }
  }

  /**
   * حذف منحة دراسية
   */
  async deleteScholarship(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const scholarshipId = id;
      
      if (!id) {
        res.status(400).json({
          success: false,
          message: 'معرف المنحة غير صحيح'
        });
        return;
      }

      const deleted = await this.scholarshipsService.deleteScholarship(scholarshipId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'المنحة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        message: 'تم حذف المنحة بنجاح'
      });
    } catch (error) {
      console.error('Error in deleteScholarship:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف المنحة'
      });
    }
  }
} 