import { Request, Response } from 'express';
import { SubscribersService } from '../services/subscribers-service';
import { InsertSubscriber } from '../../shared/schema';

export class SubscribersController {
  private subscribersService: SubscribersService;

  constructor() {
    this.subscribersService = new SubscribersService();
  }

  async subscribe(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = InsertSubscriber.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const subscriberData = validationResult.data;
      const newSubscriber = await this.subscribersService.createSubscriber(subscriberData);
      
      res.status(201).json({
        success: true,
        data: newSubscriber,
        message: 'تم الاشتراك في النشرة البريدية بنجاح'
      });
    } catch (error: any) {
      console.error('Error in subscribe:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في الاشتراك'
      });
    }
  }

  async unsubscribe(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.subscribersService.deleteSubscriber(id);
      
      res.json({
        success: true,
        message: 'تم إلغاء الاشتراك بنجاح'
      });
    } catch (error: any) {
      console.error('Error in unsubscribe:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إلغاء الاشتراك'
      });
    }
  }

  async createSubscriber(req: Request, res: Response): Promise<void> {
    // This is an alias for subscribe method
    return this.subscribe(req, res);
  }

  async listSubscribers(req: Request, res: Response): Promise<void> {
    try {
      const subscribers = await this.subscribersService.listSubscribers();
      res.json({
        success: true,
        data: subscribers,
        message: 'تم جلب قائمة المشتركين بنجاح'
      });
    } catch (error) {
      console.error('Error in listSubscribers:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب قائمة المشتركين'
      });
    }
  }

  async getSubscriber(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const subscriberId = id;
      
      if (!subscriberId) {
        res.status(400).json({
          success: false,
          message: 'معرف المشترك غير صحيح'
        });
        return;
      }

      const subscriber = await this.subscribersService.getSubscriberById(subscriberId);
      
      if (!subscriber) {
        res.status(404).json({
          success: false,
          message: 'المشترك غير موجود'
        });
        return;
      }

      res.json({
        success: true,
        data: subscriber,
        message: 'تم جلب بيانات المشترك بنجاح'
      });
    } catch (error) {
      console.error('Error in getSubscriber:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بيانات المشترك'
      });
    }
  }

  async deleteSubscriber(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const subscriberId = id;
      
      if (!subscriberId) {
        res.status(400).json({
          success: false,
          message: 'معرف المشترك غير صحيح'
        });
        return;
      }

      const deleted = await this.subscribersService.deleteSubscriber(subscriberId);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'المشترك غير موجود'
        });
        return;
      }

      res.json({
        success: true,
        message: 'تم حذف المشترك بنجاح'
      });
    } catch (error: any) {
      console.error('Error in deleteSubscriber:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في حذف المشترك'
      });
    }
  }
} 