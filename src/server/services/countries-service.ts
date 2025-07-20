import { CountriesRepository } from '../repositories/countries-repository';
import { type Country } from '../../shared/schema';

/**
 * خدمة للتعامل مع منطق الأعمال الخاص بالدول
 */
export class CountriesService {
  private countriesRepository: CountriesRepository;

  /**
   * إنشاء كائن جديد من خدمة الدول
   */
  constructor() {
    this.countriesRepository = new CountriesRepository();
  }

  /**
   * الحصول على قائمة بجميع الدول
   * @returns قائمة الدول
   */
  async listCountries(): Promise<Country[]> {
    return await this.countriesRepository.findAll();
  }

  /**
   * الحصول على دولة محددة بواسطة المعرف
   * @param id معرف الدولة
   * @returns بيانات الدولة أو null في حالة عدم وجودها
   */
  async getCountryById(id: string): Promise<Country | null> {
    const country = await this.countriesRepository.findById(id);
    return country || null;
  }

  /**
   * الحصول على دولة بواسطة الاسم المستعار (slug)
   * @param slug الاسم المستعار للدولة
   * @returns بيانات الدولة أو null في حالة عدم وجودها
   */
  async getCountryBySlug(slug: string): Promise<Country | null> {
    const country = await this.countriesRepository.findBySlug(slug);
    return country || null;
  }

  /**
   * إنشاء دولة جديدة
   * @param data بيانات الدولة
   * @returns الدولة التي تم إنشاؤها
   */
  async createCountry(data: any): Promise<Country> {
    // التحقق من عدم وجود دولة بنفس الاسم المستعار
    if (data.slug) {
      const existing = await this.countriesRepository.findBySlug(data.slug);
      if (existing) {
        throw new Error(`Country with slug '${data.slug}' already exists`);
      }
    }
    
    return await this.countriesRepository.create(data);
  }

  /**
   * تحديث دولة موجودة
   * @param id معرف الدولة
   * @param data البيانات المراد تحديثها
   * @returns الدولة بعد التحديث أو null في حالة عدم وجودها
   */
  async updateCountry(id: string, data: any): Promise<Country | null> {
    // التحقق من عدم وجود دولة أخرى بنفس الاسم المستعار
    if (data.slug) {
      const existingWithSlug = await this.countriesRepository.findBySlug(data.slug);
      if (existingWithSlug && existingWithSlug.id !== id) {
        throw new Error(`Another country with slug '${data.slug}' already exists`);
      }
    }
    
    const country = await this.countriesRepository.update(id, data);
    return country || null;
  }

  /**
   * حذف دولة
   * @param id معرف الدولة
   * @returns true إذا تم الحذف بنجاح، false إذا لم يتم العثور على الدولة
   */
  async deleteCountry(id: string): Promise<boolean> {
    return await this.countriesRepository.delete(id);
  }

  /**
   * الحصول على جميع الدول (مرادف لـ listCountries)
   */
  async getAllCountries(): Promise<Country[]> {
    return this.listCountries();
  }
}
