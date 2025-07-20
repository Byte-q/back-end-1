import { z } from "zod";
import { SubscribersRepository } from "../repositories/subscribers-repository";
// import { Subscriber, InsertSubscriber } from "../../shared/schema";

/**
 * خدمة المشتركين
 * تحتوي على المنطق الأساسي للتعامل مع المشتركين في النشرة البريدية
 */
export class SubscribersService {
  private subscribersRepository: SubscribersRepository;

  constructor() {
    this.subscribersRepository = new SubscribersRepository();
  }

  async listSubscribers() {
    return this.subscribersRepository.listSubscribers();
  }

  async getSubscriberById(id: string) {
    return this.subscribersRepository.getSubscriberById(id);
  }

  async createSubscriber(data: any) {
    return this.subscribersRepository.createSubscriber(data);
  }

  async deleteSubscriber(id: string) {
    return this.subscribersRepository.deleteSubscriber(id);
  }
}
