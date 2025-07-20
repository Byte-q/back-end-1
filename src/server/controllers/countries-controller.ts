import { Request, Response } from 'express';
import { CountriesService } from '../services/countries-service';
import { insertCountrySchema } from '../../shared/schema';

export class CountriesController {
  private countriesService: CountriesService;

  constructor() {
    this.countriesService = new CountriesService();
  }

  async listCountries(req: Request, res: Response): Promise<void> {
    try {
      const countries = await this.countriesService.getAllCountries();
      res.json({
        success: true,
        data: countries,
        message: 'تم جلب قائمة الدول بنجاح'
      });
    } catch (error) {
      console.error('Error in listCountries:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قائمة الدول'
      });
    }
  }

  async getCountryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const country = await this.countriesService.getCountryById(id);
      res.json({
        success: true,
        data: country,
        message: 'تم جلب بيانات الدولة بنجاح'
      });
    } catch (error) {
    }
  }

  async getCountryBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const country = await this.countriesService.getCountryBySlug(slug);
      
      if (!country) {
        res.status(404).json({
          success: false,
          message: 'الدولة غير موجودة'
        });
        return;
      }

      res.json({
        success: true,
        data: country,
        message: 'تم جلب بيانات الدولة بنجاح'
      });
    } catch (error) {
      console.error('Error in getCountryBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات الدولة'
      });
    }
  }

  async createCountry(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertCountrySchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const countryData = validationResult.data;
      const newCountry = await this.countriesService.createCountry(countryData);
      
      res.status(201).json({
        success: true,
        data: newCountry,
        message: 'تم إنشاء الدولة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createCountry:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء الدولة'
      });
    }
  }

  async updateCountry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const countryData = req.body;
      const updatedCountry = await this.countriesService.updateCountry(id, countryData);
      res.json({
        success: true,
        data: updatedCountry,
        message: 'تم تحديث بيانات الدولة بنجاح'
      });
    } catch (error) {
    }
  }

  async deleteCountry(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.countriesService.deleteCountry(id);
      res.json({
        success: true,
        message: 'تم حذف الدولة بنجاح'
      });
    } catch (error) {
      console.error('Error in deleteCountry:', error);
    }
  }
} 