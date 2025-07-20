import { z } from "zod";
import { PagesRepository } from "../repositories/pages-repository";
import { insertPageSchema } from "../../shared/schema";

/**
 * خدمة الصفحات
 * تحتوي على المنطق الأساسي للتعامل مع الصفحات
 */
export class PagesService {
  private repository: PagesRepository;

  constructor() {
    this.repository = new PagesRepository();
  }

  /**
   * الحصول على صفحة بواسطة المعرف
   */
  async getPage(id: string): Promise<any | undefined> {
    return this.repository.getPage(id);
  }

  async getAllPages(): Promise<any[]> {
    return this.repository.getAllPages();
  }

  /**
   * الحصول على صفحة بواسطة slug
   */
  async getPageBySlug(slug: string): Promise<any | undefined> {
    return this.repository.getPageBySlug(slug);
  }

  async getPageById(id: string): Promise<any | undefined> {
    return this.repository.getPageById(id);
  }

  /**
   * إنشاء صفحة جديدة
   */
  async createPage(pageData: z.infer<typeof insertPageSchema>): Promise<any> {
    // التحقق من صحة البيانات
    const validatedData = insertPageSchema.parse(pageData);
    // إنشاء الصفحة
    return this.repository.createPage(validatedData);
  }

  /**
   * تحديث صفحة موجودة
   */
  async updatePage(id: string, pageData: Partial<z.infer<typeof insertPageSchema>>): Promise<any | undefined> {
    // التحقق من وجود الصفحة
    const existingPage = await this.repository.getPage(id);
    if (!existingPage) {
      throw new Error(`Page with ID ${id} not found`);
    }
    // التحقق من صحة البيانات
    const validatedData = insertPageSchema.partial().parse(pageData);
    // تحديث الصفحة
    return this.repository.updatePage(id, validatedData);
  }

  /**
   * حذف صفحة
   */
  async deletePage(id: string): Promise<boolean> {
    // التحقق من وجود الصفحة
    const existingPage = await this.repository.getPage(id);
    if (!existingPage) {
      throw new Error(`Page with ID ${id} not found`);
    }
    // حذف الصفحة
    return this.repository.deletePage(id);
  }

  /**
   * الحصول على قائمة بكل الصفحات
   * يمكن تحديد تصفية حسب حالة النشر والظهور في الهيدر والفوتر
   */
  async listPages(filters?: { isPublished?: boolean, showInHeader?: boolean, showInFooter?: boolean }): Promise<any[]> {
    return this.repository.listPages(filters);
  }
}
