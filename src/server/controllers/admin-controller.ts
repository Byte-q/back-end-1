// lets build admin controller
import { Request, Response } from 'express';
import { AdminService } from '../services/admin-service';
import { insertUserSchema } from '../../shared/schema';
        
export class AdminController {
    private adminService: AdminService;

    constructor() {
    this.adminService = new AdminService();
    }

    async listAllScholarships(req: Request, res: Response): Promise<void> {
        try {
            const allData = await this.adminService.listAllScholarships();
            res.json({
                success: true,
                data: allData,
                message: "تم جلب جميع البيانات بنجاح"
            });
        } catch (error) {
            console.log('Error in ListData:', error);
            res.status(500).json({
                success: false,
                message: 'خطاء في جلب لببيانات'
            });
        }
    }

    async listAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const allData = await this.adminService.listAllUsers();
            res.json({
                success: true,
                data: allData,
                message: "تم جلب جميع البيانات بنجاح"
            });
        } catch (error) {
            console.log('Error in ListData:', error);
            res.status(500).json({
                success: false,
                message: 'خطاء في جلب لببيانات'
            });
        }
    }

    async listAllPosts(req: Request, res: Response): Promise<void> {
        try {
            const allData = await this.adminService.listAllPosts();
            res.json({
                success: true,
                data: allData,
                message: "تم جلب جميع البيانات بنجاح"
            });
        } catch (error) {
            console.log('Error in ListData:', error);
            res.status(500).json({
                success: false,
                message: 'خطاء في جلب لببيانات'
            });
        }
    }

    async listAllSuccessStories(req: Request, res: Response): Promise<void> {
        try {
            const allData = await this.adminService.listAllSuccessStories();
            res.json({
                success: true,
                data: allData,
                message: "تم جلب جميع البيانات بنجاح"
            });
        } catch (error) {
            console.log('Error in ListData:', error);
            res.status(500).json({
                success: false,
                message: 'خطاء في جلب لببيانات'
            });
        }
    }

}
