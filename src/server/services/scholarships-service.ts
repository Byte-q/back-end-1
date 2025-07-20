import { ScholarshipsRepository } from "../repositories/scholarships-repository";
import { Scholarship } from "../../shared/schema";

export class ScholarshipsService {
  private scholarshipsRepository: ScholarshipsRepository;

  constructor() {
    this.scholarshipsRepository = new ScholarshipsRepository();
  }

  async getAllScholarships() {
    return this.scholarshipsRepository.listScholarships();
  }

  async getScholarshipById(id: string) {
    return this.scholarshipsRepository.getScholarshipById(id);
  }

  async getScholarshipBySlug(slug: string) {
    return this.scholarshipsRepository.getScholarshipBySlug(slug);
  }

  async createScholarship(data: any) {
    return this.scholarshipsRepository.createScholarship(data);
  }

  async updateScholarship(id: string, data: any) {
    return this.scholarshipsRepository.updateScholarship(id, data);
  }

  async deleteScholarship(id: string) {
    return this.scholarshipsRepository.deleteScholarship(id);
  }

  async getFeaturedScholarships() {
    return this.scholarshipsRepository.getFeaturedScholarships();
  }
}
