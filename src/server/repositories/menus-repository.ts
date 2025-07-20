import { ObjectId } from 'mongodb';
import dbConnect from '../../lib/mongodb';
import { IMenuItem } from '../models/Menus';

/**
 * فئة مستودع القوائم
 * تتعامل مع عمليات قاعدة البيانات المتعلقة بالقوائم وعناصر القائمة
 */
export class MenusRepository {
  /**
   * الحصول على قائمة بواسطة المعرف
   */
  async getMenu(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('menus').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in getMenu:", error);
      throw error;
    }
  }

  async getAllMenus(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return db.connection.collection('menus').find().toArray();
    } catch (error) {
      console.error("Error in getAllMenus:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بواسطة slug
   */
  async getMenuBySlug(slug: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('menus').findOne({ slug });
    } catch (error) {
      console.error("Error in getMenuBySlug:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بواسطة الموقع
   */
  async getMenuByLocation(location: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('menus').findOne({ location });
    } catch (error) {
      console.error("Error in getMenuByLocation:", error);
      throw error;
    }
  }

  /**
   * إنشاء قائمة جديدة
   */
  async createMenu(menu: any): Promise<any> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('menus').insertOne(menu);
      return { _id: result.insertedId, ...menu };
    } catch (error) {
      console.error("Error in createMenu:", error);
      throw error;
    }
  }

  /**
   * تحديث قائمة موجودة
   */
  async updateMenu(id: string, menu: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      await db.connection.collection('menus').updateOne(
        { _id: new ObjectId(id) },
        { $set: menu }
      );
      return db.connection.collection('menus').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in updateMenu:", error);
      throw error;
    }
  }

  /**
   * حذف قائمة
   */
  async deleteMenu(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      // أولاً نقوم بحذف عناصر القائمة المرتبطة بهذه القائمة
      await db.connection.collection('menuItems').deleteMany({ menuId: new ObjectId(id) });
      // ثم نحذف القائمة نفسها
      const result = await db.connection.collection('menus').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteMenu:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بكل القوائم
   */
  async listMenus(): Promise<any[]> {
    try {
      const db = await dbConnect();
      return db.connection.collection('menus').find().toArray();
    } catch (error) {
      console.error("Error in listMenus:", error);
      throw error;
    }
  }

  /**
   * الحصول على عنصر قائمة بواسطة المعرف
   */
  async getMenuItem(id: string): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      return db.connection.collection('menuItems').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in getMenuItem:", error);
      throw error;
    }
  }

  /**
   * إنشاء عنصر قائمة جديد
   */
  async createMenuItem(item: any): Promise<any> {
    try {
      const db = await dbConnect();
      // Ensure menuId and parentId are ObjectId if present
      if (item.menuId) item.menuId = new ObjectId(item.menuId);
      if (item.parentId) item.parentId = new ObjectId(item.parentId);
      const result = await db.connection.collection('menuItems').insertOne(item);
      return { _id: result.insertedId, ...item };
    } catch (error) {
      console.error("Error in createMenuItem:", error);
      throw error;
    }
  }

  /**
   * تحديث عنصر قائمة موجود
   */
  async updateMenuItem(id: string, item: Partial<any>): Promise<any | undefined> {
    try {
      const db = await dbConnect();
      if (item.menuId) item.menuId = new ObjectId(item.menuId);
      if (item.parentId) item.parentId = new ObjectId(item.parentId);
      await db.connection.collection('menuItems').updateOne(
        { _id: new ObjectId(id) },
        { $set: item }
      );
      return db.connection.collection('menuItems').findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error("Error in updateMenuItem:", error);
      throw error;
    }
  }

  /**
   * حذف عنصر قائمة
   */
  async deleteMenuItem(id: string): Promise<boolean> {
    try {
      const db = await dbConnect();
      const result = await db.connection.collection('menuItems').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error in deleteMenuItem:", error);
      throw error;
    }
  }

  /**
   * الحصول على قائمة بعناصر القائمة التي تنتمي إلى قائمة معينة
   * يمكن تحديد parentId للحصول على عناصر القائمة الفرعية
   */
  async listMenuItems(menuId: string, parentId?: string | null): Promise<any[]> {
    try {
      const db = await dbConnect();
      const query: any = { menuId: new ObjectId(menuId) };
      if (parentId === null) {
        query.parentId = { $exists: false };
      } else if (parentId !== undefined) {
        query.parentId = new ObjectId(parentId);
      }
      return db.connection.collection('menuItems').find(query).sort({ order: 1 }).toArray();
    } catch (error) {
      console.error("Error in listMenuItems:", error);
      throw error;
    }
  }

  /**
   * الحصول على جميع عناصر القائمة مع تفاصيلها بشكل متداخل
   * هذه الطريقة تعيد هيكل مناسب لعرض القائمة متعددة المستويات
   */
  async getAllMenuItemsWithDetails(menuId: string): Promise<any[]> {
    try {
      const db = await dbConnect();
      const allItems = await db.connection.collection('menuItems')
        .find({ menuId: new ObjectId(menuId) })
        .sort({ order: 1 })
        .toArray();
      // بناء شجرة العناصر بشكل تكراري
      const buildTree = (parentId: string | null = null): any[] => {
        return allItems
          .filter((item: any) => (parentId === null ? !item.parentId : item.parentId?.toString() === parentId))
          .map((item: any) => ({
            ...item,
            children: buildTree(item._id.toString())
          }));
      };
      return buildTree(null);
    } catch (error) {
      console.error("Error in getAllMenuItemsWithDetails:", error);
      throw error;
    }
  }

  /**
   * الحصول على هيكل القائمة الكامل بناءً على الموقع
   */
  async getMenuStructure(location: string): Promise<any> {
    try {
      const menu = await this.getMenuByLocation(location);
      if (!menu) {
        return null;
      }
      const items = await this.getAllMenuItemsWithDetails(menu._id.toString());
      return {
        menu,
        items
      };
    } catch (error) {
      console.error("Error in getMenuStructure:", error);
      throw error;
    }
  }
}
