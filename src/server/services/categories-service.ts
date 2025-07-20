import { CategoriesRepository } from '../repositories/categories-repository';
import { type Category, type insertCategory } from '../../shared/schema';

/**
 * خدمة للتعامل مع منطق الأعمال الخاص بالفئات
 */
export class CategoriesService {
  private categoriesRepository: CategoriesRepository;

  /**
   * إنشاء كائن جديد من خدمة الفئات
   */
  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  /**
   * الحصول على قائمة بجميع الفئات
   * @returns قائمة الفئات
   */
  async listCategories(): Promise<Category[]> {
    return await this.categoriesRepository.findAll();
  }

  /**
   * الحصول على فئة محددة بواسطة المعرف
   * @param id معرف الفئة
   * @returns بيانات الفئة أو null في حالة عدم وجودها
   */
  async getCategoryById(id: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findById(id);
    return category || null;
  }

  /**
   * الحصول على فئة بواسطة الاسم المستعار (slug)
   * @param slug الاسم المستعار للفئة
   * @returns بيانات الفئة أو null في حالة عدم وجودها
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findBySlug(slug);
    return category || null;
  }

  /**
   * إنشاء فئة جديدة
   * @param data بيانات الفئة
   * @returns الفئة التي تم إنشاؤها
   */
  async createCategory(data: Category): Promise<Category> {
    // التحقق من عدم وجود فئة بنفس الاسم المستعار
    if (data.slug) {
      const existing = await this.categoriesRepository.findBySlug(data.slug);
      if (existing) {
        throw new Error(`Category with slug '${data.slug}' already exists`);
      }
    }
    
    return await this.categoriesRepository.create(data);
  }

  /**
   * تحديث فئة موجودة
   * @param id معرف الفئة
   * @param data البيانات المراد تحديثها
   * @returns الفئة بعد التحديث أو null في حالة عدم وجودها
   */
  async updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
    // التحقق من عدم وجود فئة أخرى بنفس الاسم المستعار
    if (data.slug) {
      const existingWithSlug = await this.categoriesRepository.findBySlug(data.slug);
      if (existingWithSlug && existingWithSlug._id !== id) {
        throw new Error(`Another category with slug '${data.slug}' already exists`);
      }
    }
    
    const category = await this.categoriesRepository.update(id, data);
    return category || null;
  }

  /**
   * حذف فئة
   * @param id معرف الفئة
   * @returns true إذا تم الحذف بنجاح، false إذا لم يتم العثور على الفئة
   */
  async deleteCategory(id: string): Promise<boolean> {
    return await this.categoriesRepository.delete(id);
  }

  /**
   * الحصول على جميع الفئات (مرادف لـ listCategories)
   */
  async getAllCategories(): Promise<Category[]> {
    return this.listCategories();
  }
}
