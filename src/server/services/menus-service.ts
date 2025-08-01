import { MenusRepository } from "../repositories/menus-repository";
import { insertMenuSchema, insertMenuItemSchema } from "../../shared/schema";
import { z } from "zod";

/**
 * خدمة القوائم
 * تحتوي على المنطق الأساسي للتعامل مع القوائم وعناصر القائمة
 */
export class MenusService {
  private repository: MenusRepository;

  constructor() {
    this.repository = new MenusRepository();
  }

  /**
   * الحصول على قائمة بواسطة المعرف
   */
  async getMenu(id: string): Promise<any | undefined> {
    return this.repository.getMenu(id);
  }

  /**
   * الحصول على قائمة بواسطة slug
   */
  async getMenuBySlug(slug: string): Promise<any | undefined> {
    return this.repository.getMenuBySlug(slug);
  }

  async getAllMenus(): Promise<any[]> {
    return this.repository.getAllMenus();
  }

  /**
   * الحصول على قائمة بواسطة الموقع
   */
  async getMenuByLocation(location: string): Promise<any | undefined> {
    return this.repository.getMenuByLocation(location);
  }

  /**
   * إنشاء قائمة جديدة
   */
  async createMenu(menuData: z.infer<typeof insertMenuSchema>): Promise<any> {
    // التحقق من صحة البيانات
    const validatedData = insertMenuSchema.parse(menuData);
    // إنشاء القائمة
    return this.repository.createMenu(validatedData);
  }

  /**
   * تحديث قائمة موجودة
   */
  async updateMenu(id: string, menuData: Partial<z.infer<typeof insertMenuSchema>>): Promise<any | undefined> {
    // التحقق من وجود القائمة
    const existingMenu = await this.repository.getMenu(id);
    if (!existingMenu) {
      throw new Error(`Menu with ID ${id} not found`);
    }
    // التحقق من صحة البيانات
    const validatedData = insertMenuSchema.partial().parse(menuData);
    // تحديث القائمة
    return this.repository.updateMenu(id, validatedData);
  }

  /**
   * حذف قائمة
   */
  async deleteMenu(id: string): Promise<boolean> {
    // التحقق من وجود القائمة
    const existingMenu = await this.repository.getMenu(id);
    if (!existingMenu) {
      throw new Error(`Menu with ID ${id} not found`);
    }
    // حذف القائمة
    return this.repository.deleteMenu(id);
  }

  /**
   * الحصول على قائمة بكل القوائم
   */
  async listMenus(): Promise<any[]> {
    return this.repository.listMenus();
  }

  /**
   * الحصول على عنصر قائمة بواسطة المعرف
   */
  async getMenuItem(id: string): Promise<any | undefined> {
    return this.repository.getMenuItem(id);
  }

  /**
   * إنشاء عنصر قائمة جديد
   */
  async createMenuItem(itemData: z.infer<typeof insertMenuItemSchema>): Promise<any> {
    // التحقق من صحة البيانات
    const validatedData = insertMenuItemSchema.parse(itemData);
    // التحقق من وجود القائمة
    const menu = await this.repository.getMenu(validatedData.menuId);
    if (!menu) {
      throw new Error(`Menu with ID ${validatedData.menuId} not found`);
    }
    // التحقق من وجود العنصر الأب (إذا كان محدداً)
    if (validatedData.parentId !== null && validatedData.parentId !== undefined) {
      const parentItem = await this.repository.getMenuItem(validatedData.parentId);
      if (!parentItem) {
        throw new Error(`Parent menu item with ID ${validatedData.parentId} not found`);
      }
      // التأكد من أن العنصر الأب ينتمي لنفس القائمة
      if (parentItem.menuId.toString() !== validatedData.menuId.toString()) {
        throw new Error(`Parent menu item belongs to a different menu`);
      }
    }
    // إنشاء عنصر القائمة
    return this.repository.createMenuItem(validatedData);
  }

  /**
   * تحديث عنصر قائمة موجود
   */
  async updateMenuItem(id: string, itemData: Partial<z.infer<typeof insertMenuItemSchema>>): Promise<any | undefined> {
    // التحقق من وجود عنصر القائمة
    const existingItem = await this.repository.getMenuItem(id);
    if (!existingItem) {
      throw new Error(`Menu item with ID ${id} not found`);
    }
    // التحقق من صحة البيانات
    const validatedData = insertMenuItemSchema.partial().parse(itemData);
    // التحقق من وجود العنصر الأب (إذا تم تغييره)
    if (validatedData.parentId !== undefined && validatedData.parentId !== null) {
      const parentItem = await this.repository.getMenuItem(validatedData.parentId);
      if (!parentItem) {
        throw new Error(`Parent menu item with ID ${validatedData.parentId} not found`);
      }
      // التأكد من أن العنصر الأب ينتمي لنفس القائمة
      if (parentItem.menuId.toString() !== existingItem.menuId.toString()) {
        throw new Error(`Parent menu item belongs to a different menu`);
      }
    }
    // تحديث عنصر القائمة
    return this.repository.updateMenuItem(id, validatedData);
  }

  /**
   * حذف عنصر قائمة
   */
  async deleteMenuItem(id: string): Promise<boolean> {
    // التحقق من وجود عنصر القائمة
    const existingItem = await this.repository.getMenuItem(id);
    if (!existingItem) {
      throw new Error(`Menu item with ID ${id} not found`);
    }
    // حذف عنصر القائمة
    return this.repository.deleteMenuItem(id);
  }

  /**
   * الحصول على قائمة بعناصر القائمة التي تنتمي إلى قائمة معينة
   */
  async listMenuItems(menuId: string, parentId?: string | null): Promise<any[]> {
    // التحقق من وجود القائمة
    const menu = await this.repository.getMenu(menuId);
    if (!menu) {
      throw new Error(`Menu with ID ${menuId} not found`);
    }
    // الحصول على عناصر القائمة
    return this.repository.listMenuItems(menuId, parentId);
  }

  /**
   * الحصول على جميع عناصر القائمة مع تفاصيلها بشكل متداخل
   */
  async getAllMenuItemsWithDetails(menuId: string): Promise<any[]> {
    // التحقق من وجود القائمة
    const menu = await this.repository.getMenu(menuId);
    if (!menu) {
      throw new Error(`Menu with ID ${menuId} not found`);
    }
    // الحصول على هيكل العناصر
    return this.repository.getAllMenuItemsWithDetails(menuId);
  }

  /**
   * الحصول على هيكل القائمة الكامل بناءً على الموقع
   */
  async getMenuStructure(location: string): Promise<any> {
    return this.repository.getMenuStructure(location);
  }
}
