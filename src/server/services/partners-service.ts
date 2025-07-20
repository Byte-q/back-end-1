import { PartnersRepository } from '../repositories/partners-repository';
import { Partner, InsertPartner } from '../../shared/schema';
import { z } from 'zod';

type InsertPartnerType = z.infer<typeof InsertPartner>;

export class PartnersService {
  private partnersRepository: PartnersRepository;

  constructor() {
    this.partnersRepository = new PartnersRepository();
  }

  /**
   * الحصول على شريك بواسطة المعرف
   * @param id معرف الشريك
   * @returns بيانات الشريك أو null إذا لم يكن موجوداً
   */
  async getPartnerById(id: string): Promise<Partner | null> {
    try {
      return await this.partnersRepository.getPartnerById(id);
    } catch (error) {
      console.error('Error in PartnersService.getPartnerById:', error);
      throw error;
    }
  }

  /**
   * إنشاء شريك جديد
   * @param data بيانات الشريك
   * @returns الشريك الذي تم إنشاؤه
   */
  async createPartner(data: InsertPartnerType): Promise<Partner> {
    try {
      return await this.partnersRepository.createPartner(data);
    } catch (error) {
      console.error('Error in PartnersService.createPartner:', error);
      throw error;
    }
  }

  /**
   * تحديث شريك موجود
   * @param id معرف الشريك
   * @param data البيانات المراد تحديثها
   * @returns الشريك المحدث أو null إذا لم يتم العثور عليه
   */
  async updatePartner(id: string, data: Partial<InsertPartnerType>): Promise<Partner | null> {
    try {
      return await this.partnersRepository.updatePartner(id, data);
    } catch (error) {
      console.error('Error in PartnersService.updatePartner:', error);
      throw error;
    }
  }

  /**
   * حذف شريك
   * @param id معرف الشريك
   * @returns هل تمت عملية الحذف بنجاح
   */
  async deletePartner(id: string): Promise<boolean> {
    try {
      return await this.partnersRepository.deletePartner(id);
    } catch (error) {
      console.error('Error in PartnersService.deletePartner:', error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة الشركاء
   * @param isActive فلتر النشاط (اختياري)
   * @returns قائمة الشركاء
   */
  async listPartners(isActive?: boolean): Promise<Partner[]> {
    try {
      const filters = isActive !== undefined ? { isActive } : undefined;
      return await this.partnersRepository.listPartners(filters);
    } catch (error) {
      console.error('Error in PartnersService.listPartners:', error);
      throw error;
    }
  }

  /**
   * الحصول على جميع الشركاء
   */
  async getAllPartners(): Promise<Partner[]> {
    return this.partnersRepository.listPartners();
  }
}
