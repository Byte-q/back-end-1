import { LevelsRepository } from '../repositories/levels-repository';
import { type Level } from '../../shared/schema';

/**
 * خدمة للتعامل مع منطق الأعمال الخاص بالمستويات
 */
export class LevelsService {
  private levelsRepository: LevelsRepository;

  /**
   * إنشاء كائن جديد من خدمة المستويات
   */
  constructor() {
    this.levelsRepository = new LevelsRepository();
  }

  /**
   * الحصول على قائمة بجميع المستويات
   * @returns قائمة المستويات
   */
  async listLevels(): Promise<Level[]> {
    return await this.levelsRepository.findAll();
  }

  /**
   * الحصول على مستوى محدد بواسطة المعرف
   * @param id معرف المستوى
   * @returns بيانات المستوى أو null في حالة عدم وجوده
   */
  async getLevelById(id: string): Promise<Level | null> {
    const level = await this.levelsRepository.findById(id);
    return level || null;
  }

  /**
   * الحصول على مستوى بواسطة الاسم المستعار (slug)
   * @param slug الاسم المستعار للمستوى
   * @returns بيانات المستوى أو null في حالة عدم وجوده
   */
  async getLevelBySlug(slug: string): Promise<Level | null> {
    const level = await this.levelsRepository.findBySlug(slug);
    return level || null;
  }

  /**
   * إنشاء مستوى جديد
   * @param data بيانات المستوى
   * @returns المستوى الذي تم إنشاؤه
   */
  async createLevel(data: any): Promise<Level> {
    // التحقق من عدم وجود مستوى بنفس الاسم المستعار
    if (data.slug) {
      const existing = await this.levelsRepository.findBySlug(data.slug);
      if (existing) {
        throw new Error(`Level with slug '${data.slug}' already exists`);
      }
    }
    
    return await this.levelsRepository.create(data);
  }

  /**
   * تحديث مستوى موجود
   * @param id معرف المستوى
   * @param data البيانات المراد تحديثها
   * @returns المستوى بعد التحديث أو null في حالة عدم وجوده
   */
  async updateLevel(id: string, data: any): Promise<Level | null> {
    // التحقق من عدم وجود مستوى آخر بنفس الاسم المستعار
    if (data.slug) {
      const existingWithSlug = await this.levelsRepository.findBySlug(data.slug);
      if (existingWithSlug && existingWithSlug._id !== id) {
        throw new Error(`Another level with slug '${data.slug}' already exists`);
      }
    }
    
    const level = await this.levelsRepository.update(id, data);
    return level || null;
  }

  /**
   * حذف مستوى
   * @param id معرف المستوى
   * @returns true إذا تم الحذف بنجاح، false إذا لم يتم العثور على المستوى
   */
  async deleteLevel(id: string): Promise<boolean> {
    return await this.levelsRepository.delete(id);
  }

  /**
   * الحصول على جميع المستويات (مرادف لـ listLevels)
   */
  async getAllLevels(): Promise<Level[]> {
    return this.listLevels();
  }
}
