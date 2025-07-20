import { UsersService } from './users-service';
import { Request } from 'express';

export class AuthService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  /**
   * تسجيل الدخول
   */
  async login(username: string, password: string): Promise<any | null> {
    return this.usersService.login(username, password);
  }

  /**
   * تسجيل الخروج
   */
  async logout(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      // التحقق من وجود جلسة نشطة
      if (!req.session) {
        resolve();
        return;
      }
      // إلغاء الجلسة
      req.session.destroy((err: any) => {
        if (err) {
          console.error('Error destroying session during logout:', err);
          reject(new Error('فشل في إلغاء الجلسة'));
        } else {
          console.log('Session destroyed successfully during logout');
          resolve();
        }
      });
    });
  }

  /**
   * الحصول على المستخدم الحالي من الطلب
   */
  async getCurrentUser(req: Request): Promise<any | null> {
    // التحقق من وجود المستخدم في الجلسة
    if (!req.user) {
      return null;
    }
    const userId = (req.user as any)._id || (req.user as any).id;
    if (!userId) {
      return null;
    }
    const user = await this.usersService.getUserById(userId.toString());
    return user || null;
  }

  /**
   * التسجيل (إنشاء حساب جديد)
   */
  async createUser(userData: any): Promise<any> {
    return this.usersService.createUser(userData);
  }

  /**
   * الحصول على مستخدم بواسطة المعرف
   */
  async getUserById(id: string): Promise<any | undefined> {
    return this.usersService.getUserById(parseInt(id));
  }

  /**
   * التحقق مما إذا كان المستخدم مسؤولاً
   */
  isAdmin(user: any): boolean {
    return this.usersService.isAdmin(user);
  }

  /**
   * البحث عن مستخدم بواسطة اسم المستخدم
   */
  async getUserByUsername(username: string): Promise<any | undefined> {
    return this.usersService.getUserByUsername(username);
  }

  /**
   * البحث عن مستخدم بواسطة البريد الإلكتروني
   */
  async getUserByEmail(email: string): Promise<any | undefined> {
    return this.usersService.getUserByEmail(email);
  }
}
