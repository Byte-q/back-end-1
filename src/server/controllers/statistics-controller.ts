import { Request, Response } from 'express';
import { StatisticsService } from '../services/statistics-service';
import { insertStatisticSchema } from '../../shared/schema';

export class StatisticsController {
  private statisticsService: StatisticsService;

  constructor() {
    this.statisticsService = new StatisticsService();
  }

  // async getDashboardStatistics(req: Request, res: Response): Promise<void> {
  //   try {
  //     const stats = await this.statisticsService.getDashboardStatistics();
  //     res.json({
  //       success: true,
  //       data: stats,
  //       message: 'تم جلب إحصائيات لوحة التحكم بنجاح'
  //     });
  //   } catch (error) {
  //     console.error('Error in getDashboardStatistics:', error);
  //     res.status(500).json({
  //       success: false,
  //       message: 'خطأ في جلب إحصائيات لوحة التحكم'
  //     });
  //   }
  // }

  async createStatistic(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertStatisticSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const statisticData = validationResult.data;
      const newStatistic = await this.statisticsService.createStatistic(statisticData);
      
      res.status(201).json({
        success: true,
        data: newStatistic,
        message: 'تم إنشاء الإحصائية بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createStatistic:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء الإحصائية'
      });
    }
  }

  async listStatistics(req: Request, res: Response): Promise<void> {
    try {
      const statistics = await this.statisticsService.listStatistics();
      res.json({
        success: true,
        data: statistics,
        message: 'تم جلب إحصائيات لوحة التحكم بنجاح'
      });
    } catch (error: any) {
      console.error('Error in listStatistics:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب إحصائيات لوحة التحكم',
        error: error.message
      });
    }
  }

  async getStatistic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const statistic = await this.statisticsService.getStatistics(id);
      res.json({
        success: true,
        data: statistic,
        message: 'تم جلب الإحصائية بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getStatistic:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الإحصائية',
        error: error.message
      });
    }
  }

  async updateStatistic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const statistic = await this.statisticsService.updateStatistic(id, req.body);
      res.json({
        success: true,
        data: statistic,
        message: 'تم تحديث الإحصائية بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateStatistic:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث الإحصائية',
        error: error.message
      });
    }
  }

  async deleteStatistic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const statistic = await this.statisticsService.deleteStatistic(id);
      res.json({
        success: true,
        data: statistic,
        message: 'تم حذف الإحصائية بنجاح'
      });
    } catch (error: any) {
      console.error('Error in deleteStatistic:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف الإحصائية',
        error: error.message
      });
    }
  }

  async getStatisticByType(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.params;
      const statistic = await this.statisticsService.getStatisticByType(type);
      res.json({
        success: true,
        data: statistic,
        message: 'تم جلب الإحصائية بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getStatisticByType:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب الإحصائية',
        error: error.message
      });
    }
  }
} 