import { SuccessStoriesRepository } from "../repositories/success-stories-repository";
import { SuccessStoryModel, ISuccessStory } from "../models/SuccessStory";

export class SuccessStoriesService {
  private successStoriesRepository: SuccessStoriesRepository;

  constructor() {
    this.successStoriesRepository = new SuccessStoriesRepository();
  }

  /**
   * الحصول على قصة نجاح بواسطة المعرف
   */
  async getSuccessStoryById(id: string): Promise<ISuccessStory | undefined> {
    return this.successStoriesRepository.getSuccessStoryById(id);
  }

  /**
   * الحصول على قصة نجاح بواسطة الاسم المستعار
   */
  async getSuccessStoryBySlug(slug: string): Promise<ISuccessStory | undefined> {
    return this.successStoriesRepository.getSuccessStoryBySlug(slug);
  }

  /**
   * إنشاء قصة نجاح جديدة
   */
  async createSuccessStory(storyData: ISuccessStory): Promise<ISuccessStory> {
    // يمكن إضافة منطق أعمال إضافي قبل إنشاء قصة النجاح
    // مثل التحقق من صحة البيانات، أو إنشاء اسم مستعار تلقائي إذا لم يتم توفيره

    // إنشاء اسم مستعار إذا لم يتم توفيره
    if (!storyData.slug && storyData.title) {
      storyData.slug = this.generateSlug(storyData.title);
    }

    return this.successStoriesRepository.createSuccessStory(storyData);
  }

  /**
   * تحديث قصة نجاح
   */
  async updateSuccessStory(id: string, storyData: Partial<ISuccessStory>): Promise<ISuccessStory | undefined> {
    // التحقق من وجود قصة النجاح
    const existingStory = await this.successStoriesRepository.getSuccessStoryById(id);
    if (!existingStory) {
      return undefined;
    }

    // إنشاء اسم مستعار إذا تم تغيير العنوان ولم يتم توفير اسم مستعار جديد
    if (storyData.title && !storyData.slug) {
      storyData.slug = this.generateSlug(storyData.title);
    }

    return this.successStoriesRepository.updateSuccessStory(id, storyData);
  }

  /**
   * حذف قصة نجاح
   */
  async deleteSuccessStory(id: string): Promise<boolean> {
    // التحقق من وجود قصة النجاح
    const existingStory = await this.successStoriesRepository.getSuccessStoryById(id);
    if (!existingStory) {
      return false;
    }

    return this.successStoriesRepository.deleteSuccessStory(id);
  }

  /**
   * الحصول على قائمة قصص النجاح
   */
  async listSuccessStories(filters?: {
    isFeatured?: boolean,
    limit?: number
  }): Promise<ISuccessStory[]> {
    return this.successStoriesRepository.listSuccessStories(filters);
  }

  /**
   * الحصول على جميع قصص النجاح
   */
  async getAllSuccessStories(): Promise<ISuccessStory[]> {
    return this.successStoriesRepository.listSuccessStories();
  }

  /**
   * توليد اسم مستعار من العنوان
   * وظيفة مساعدة لإنشاء اسم مستعار من عنوان قصة النجاح
   */
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')       // استبدال المسافات بشرطات
      .replace(/[^\u0621-\u064A\u0660-\u0669a-z0-9-]/g, '') // إزالة الأحرف غير العربية والإنجليزية والأرقام والشرطات
      .replace(/-+/g, '-')        // استبدال الشرطات المتعددة بشرطة واحدة
      .replace(/^-+/, '')         // إزالة الشرطات من بداية النص
      .replace(/-+$/, '');        // إزالة الشرطات من نهاية النص
  }
}
