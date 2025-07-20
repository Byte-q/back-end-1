import { Request, Response } from 'express';
import { MenusService } from '../services/menus-service';
import { insertMenuSchema, insertMenuItemSchema } from '../../shared/schema';

export class MenusController {
  private menusService: MenusService;

  constructor() {
    this.menusService = new MenusService();
  }

  async getMenus(req: Request, res: Response): Promise<void> {
    try {
      const menus = await this.menusService.getAllMenus();
      res.json({
        success: true,
        data: menus,
        message: 'تم جلب القوائم بنجاح'
      });
    } catch (error) {
      console.error('Error in getMenus:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب القوائم'
      });
    }
  }

  async getMenuBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const menu = await this.menusService.getMenuBySlug(slug);
      res.json({
        success: true,
        data: menu,
        message: 'تم جلب القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getMenuBySlug:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب القائمة',
        error: error.message
      });
    }
  }

  async getMenuByLocation(req: Request, res: Response): Promise<void> {
    try {
      const { location } = req.params;
      const menu = await this.menusService.getMenuByLocation(location);
      res.json({
        success: true,
        data: menu,
        message: 'تم جلب القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getMenuByLocation:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب القائمة',
        error: error.message
      });
    }
  }

  async getMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menu = await this.menusService.getMenu(id);
      res.json({
        success: true,
        data: menu,
        message: 'تم جلب القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getMenu:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب القائمة',
        error: error.message
      });
    }
  }

  async updateMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menu = await this.menusService.updateMenu(id, req.body);
      res.json({
        success: true,
        data: menu,
        message: 'تم تحديث القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateMenu:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث القائمة',
        error: error.message
      });
    }
  }

  async deleteMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menu = await this.menusService.deleteMenu(id);
      res.json({
        success: true,
        data: menu,
        message: 'تم حذف القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in deleteMenu:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف القائمة',
        error: error.message
      });
    }
  }

  async listMenus(req: Request, res: Response): Promise<void> {
    try {
      const menus = await this.menusService.getAllMenus();
      res.json({
        success: true,
        data: menus,
        message: 'تم جلب القوائم بنجاح'
      });
    } catch (error: any) {
      console.error('Error in listMenus:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب القوائم',
        error: error.message
      });
    }
  }

  async listMenuItems(req: Request, res: Response): Promise<void> {
    try {
      const { menuId } = req.params;
      const menuItems = await this.menusService.listMenuItems(menuId);
      res.json({
        success: true,
        data: menuItems,
        message: 'تم جلب عناصر القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in listMenuItems:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب عناصر القائمة',
        error: error.message
      });
    }
  }

  async getAllMenuItemsWithDetails(req: Request, res: Response): Promise<void> {
    try {
      const { menuId } = req.params;
      const menuItems = await this.menusService.getAllMenuItemsWithDetails(menuId);
      res.json({
        success: true,
        data: menuItems,
        message: 'تم جلب عناصر القائمة بنجاح',
      });
    } catch (error: any) {
      console.error('Error in getAllMenuItemsWithDetails:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب عناصر القائمة',
        error: error.message
      });
    }
  }

  async getMenuItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menuItem = await this.menusService.getMenuItem(id);
      res.json({
        success: true,
        data: menuItem,
        message: 'تم جلب عنصر القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getMenuItem:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب عنصر القائمة',
        error: error.message
      });
    }
  }

  async updateMenuItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menuItem = await this.menusService.updateMenuItem(id, req.body);
      res.json({
        success: true,
        data: menuItem,
        message: 'تم تحديث عنصر القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in updateMenuItem:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في تحديث عنصر القائمة',
        error: error.message
      });
    }
  }

  async deleteMenuItem(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menuItem = await this.menusService.deleteMenuItem(id);
      res.json({
        success: true,
        data: menuItem,
        message: 'تم حذف عنصر القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in deleteMenuItem:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في حذف عنصر القائمة',
        error: error.message
      });
    }
  }

  async getMenuStructure(req: Request, res: Response): Promise<void> {
    try {
      const { location } = req.params;
      const menuStructure = await this.menusService.getMenuStructure(location);
      res.json({
        success: true,
        data: menuStructure,
        message: 'تم جلب بنية القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in getMenuStructure:', error);
      res.status(500).json({
        success: false,
        message: 'خطأ في جلب بنية القائمة',
        error: error.message
      });
    }
  }

  async createMenu(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertMenuSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const menuData = validationResult.data;
      const newMenu = await this.menusService.createMenu(menuData);
      
      res.status(201).json({
        success: true,
        data: newMenu,
        message: 'تم إنشاء القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createMenu:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء القائمة'
      });
    }
  }

  async createMenuItem(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = insertMenuItemSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({
          success: false,
          message: 'بيانات غير صحيحة',
          errors: validationResult.error.errors
        });
        return;
      }

      const menuItemData = validationResult.data;
      const newMenuItem = await this.menusService.createMenuItem(menuItemData);
      
      res.status(201).json({
        success: true,
        data: newMenuItem,
        message: 'تم إنشاء عنصر القائمة بنجاح'
      });
    } catch (error: any) {
      console.error('Error in createMenuItem:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'خطأ في إنشاء عنصر القائمة'
      });
    }
  }
} 