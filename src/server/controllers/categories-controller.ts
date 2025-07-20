import { Request, Response } from 'express';
import { CategoriesService } from '../services/categories-service';
import { insertCategory } from '../../shared/schema';

export class CategoriesController {
  private categoriesService: CategoriesService;

  constructor() {
    this.categoriesService = new CategoriesService();
  }

  /**
   * الحصول على قائمة الفئات
   */
  async listCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoriesService.getAllCategories();
      
      res.json({
        success: true,
        data: categories,
        message: 'تم جلب قائمة الفئات بنجاح'
      });
    } catch (error) {
      console.error('Error in listCategories:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قائمة الفئات'
      });
    }
  }

  /**
   * الحصول على فئة بواسطة المعرف
   */
  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const categoryId = id;
      
      if (!categoryId) {
        res.status(400).json({
          success: false,
          message: 'معرف الفئة غير صحيح'
        });
        return;
      }

      const category = await this.categoriesService.getCategoryById(categoryId);
      
      if (!category) {
        res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: category,
        message: 'تم جلب بيانات الفئة بنجاح'
      });
    } catch (error) {
      console.error('Error in getCategoryById:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات الفئة'
      });
    }
  }

  /**
   * الحصول على فئة بواسطة الرابط المختصر
   */
  async getCategoryBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const category = await this.categoriesService.getCategoryBySlug(slug);
      
      if (!category) {
        res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: category,
        message: 'تم جلب بيانات الفئة بنجاح'
      });
    } catch (error) {
      console.error('Error in getCategoryBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات الفئة'
      });
    }
  }

  /**
   * إنشاء فئة جديدة
   */
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertCategory.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const categoryData = validationResult.data;
      const newCategory = await this.categoriesService.createCategory(categoryData);
      
      res.status(201).json({
        success: true,
        data: newCategory,
        message: 'تم إنشاء الفئة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createCategory:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء الفئة'
      });
    }
  }

  /**
   * تحديث فئة
   */
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const categoryId = id;
      
      if (!categoryId) {
        res.status(400).json({
          success: false,
          message: 'معرف الفئة غير صحيح'
        });
        return;
      }

      const validationResult = insertCategory.partial().safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const categoryData = validationResult.data;
      const updatedCategory = await this.categoriesService.updateCategory(categoryId, categoryData);
      
      if (!updatedCategory) {
        res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: updatedCategory,
        message: 'تم تحديث الفئة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateCategory:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في تحديث الفئة'
      });
    }
  }

  /**
   * حذف فئة
   */
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const categoryId = id;
      
      if (!categoryId) {
        res.status(400).json({
          success: false,
          message: 'معرف الفئة غير صحيح'
        });
        return;
      }

      const deleted = await this.categoriesService.deleteCategory(categoryId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'الفئة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        message: 'تم حذف الفئة بنجاح'
      });
    } catch (error) {
      console.error('Error in deleteCategory:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الفئة'
      });
    }
  }
} 