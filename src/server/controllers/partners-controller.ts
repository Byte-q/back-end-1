import { Request, Response } from 'express';
import { PartnersService } from '../services/partners-service';
import { InsertPartner } from '../../shared/schema';

export class PartnersController {
  private partnersService: PartnersService;

  constructor() {
    this.partnersService = new PartnersService();
  }

  async listPartners(req: Request, res: Response): Promise<void> {
    try {
      const partners = await this.partnersService.getAllPartners();
      res.json({
        success: true,
        data: partners,
        message: 'تم جلب قائمة الشركاء بنجاح'
      });
    } catch (error) {
      console.error('Error in listPartners:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قائمة الشركاء'
      });
    }
  }

  async getPartnerById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const partner = await this.partnersService.getPartnerById(id);
      res.json({
        success: true,
        data: partner,
        message: 'تم جلب الشريك بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getPartnerById:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الشريك',
        error: error.message
      });
    }
  }

  async updatePartner(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const partner = await this.partnersService.updatePartner(id, req.body);
      res.json({
        success: true,
        data: partner,
        message: 'تم تحديث الشريك بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updatePartner:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث الشريك',
        error: error.message
      });
    }
  }

  async deletePartner(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const partner = await this.partnersService.deletePartner(id);
      res.json({
        success: true,
        data: partner,
        message: 'تم حذف الشريك بنجاح'
      });
    } catch (error: any) {
      console.error('Error in deletePartner:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الشريك',
        error: error.message
      });
    }
  }

  async createPartner(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = InsertPartner.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const partnerData = validationResult.data;
      const newPartner = await this.partnersService.createPartner(partnerData);
      
      res.status(201).json({
        success: true,
        data: newPartner,
        message: 'تم إنشاء الشريك بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createPartner:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء الشريك'
      });
    }
  }
} 