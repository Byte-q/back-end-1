import { z } from "zod";
import { SeoSettingsRepository } from "../repositories/seo-settings-repository";
import { insertSeoSettingsSchema } from "../../shared/schema";

/**
 * خدمة إعدادات SEO
 * تحتوي على المنطق الأساسي للتعامل مع إعدادات تحسين محركات البحث
 */
export class SeoSettingsService {
  private repository: SeoSettingsRepository;

  constructor() {
    this.repository = new SeoSettingsRepository();
  }

  /**
   * إنشاء إعدادات SEO
   * @param seoSettingData بيانات إعدادات SEO
   * @returns إعدادات SEO
   */
  async createSeoSettings(seoSettingData: z.infer<typeof insertSeoSettingsSchema>): Promise<any> {
    return this.repository.createSeoSetting(seoSettingData);
  }

  /**
   * حذف إعدادات SEO
   * @param id معرف إعدادات SEO
   * @returns إعدادات SEO
   */
  async deleteSeoSettings(id: string): Promise<boolean> {
    return this.repository.deleteSeoSetting(id);
  }

  /**
   * الحصول على إعداد SEO بواسطة المعرف
   */
  async getSeoSetting(id: string): Promise<any | undefined> {
    return this.repository.getSeoSetting(id);
  }

  /**
   * الحصول على إعداد SEO بواسطة مسار الصفحة
   */
  async getSeoSettingByPath(pagePath: string): Promise<any | undefined> {
    return this.repository.getSeoSettingByPath(pagePath);
  }

  /**
   * إنشاء إعداد SEO جديد
   */
  async createSeoSetting(seoSettingData: z.infer<typeof insertSeoSettingsSchema>): Promise<any> {
    // التحقق من صحة البيانات
    const validatedData = insertSeoSettingsSchema.parse(seoSettingData);
    // التحقق مما إذا كان هناك إعداد SEO بنفس المسار
    const existingSetting = await this.repository.getSeoSettingByPath(validatedData.pagePath);
    if (existingSetting) {
      throw new Error(`SEO setting for path ${validatedData.pagePath} already exists`);
    }
    // إنشاء إعداد SEO
    return this.repository.createSeoSetting(validatedData);
  }

  /**
   * تحديث إعداد SEO موجود
   */
  async updateSeoSetting(id: string, seoSettingData: Partial<z.infer<typeof insertSeoSettingsSchema>>): Promise<any | undefined> {
    // التحقق من وجود إعداد SEO
    const existingSetting = await this.repository.getSeoSetting(id);
    if (!existingSetting) {
      throw new Error(`SEO setting with ID ${id} not found`);
    }
    // التحقق من صحة البيانات
    const validatedData = insertSeoSettingsSchema.partial().parse(seoSettingData);
    // التحقق مما إذا كان هناك تغيير في المسار وهناك إعداد آخر بنفس المسار الجديد
    if (validatedData.pagePath && validatedData.pagePath !== existingSetting.pagePath) {
      const conflictingSetting = await this.repository.getSeoSettingByPath(validatedData.pagePath);
      if (conflictingSetting && conflictingSetting._id.toString() !== id) {
        throw new Error(`Another SEO setting with path ${validatedData.pagePath} already exists`);
      }
    }
    // تحديث إعداد SEO
    return this.repository.updateSeoSetting(id, validatedData);
  }

  /**
   * حذف إعداد SEO
   */
  async deleteSeoSetting(id: string): Promise<boolean> {
    // التحقق من وجود إعداد SEO
    const existingSetting = await this.repository.getSeoSetting(id);
    if (!existingSetting) {
      throw new Error(`SEO setting with ID ${id} not found`);
    }
    // حذف إعداد SEO
    return this.repository.deleteSeoSetting(id);
  }

  /**
   * الحصول على قائمة بكل إعدادات SEO
   */
  async listSeoSettings(): Promise<any[]> {
    return this.repository.listSeoSettings();
  }

  /**
   * الحصول على إعدادات SEO لصفحة معينة
   */
  async getSeoSettings(pagePath: string): Promise<any | null> {
    const setting = await this.repository.getSeoSettingByPath(pagePath);
    return setting || null;
  }

  /**
   * تحديث إعدادات SEO لصفحة معينة
   */
  async updateSeoSettings(data: Partial<any>): Promise<any> {
    // التحقق من وجود إعدادات SEO للصفحة
    const existingSetting = await this.repository.getSeoSettingByPath(data.pagePath || '');
    if (existingSetting) {
      // تحديث الإعدادات الموجودة
      const updatedSetting = await this.repository.updateSeoSetting(existingSetting._id.toString(), data);
      if (!updatedSetting) {
        throw new Error('فشل في تحديث إعدادات SEO');
      }
      return updatedSetting;
    } else {
      // إنشاء إعدادات جديدة
      if (!data.pagePath) {
        throw new Error('مسار الصفحة مطلوب');
      }
      return this.repository.createSeoSetting(data);
    }
  }
}
