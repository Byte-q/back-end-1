import { AdminRepository } from "../repositories/admin-repository";

export class AdminService {
    private adminRepository: AdminRepository;

    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async listAllScholarships(): Promise<any[]> {
        return await this.adminRepository.findAllScholarships();
    }

    async listAllUsers(): Promise<any[]> {
        return await this.adminRepository.findAllUsers();
    }
    async listAllPosts(): Promise<any[]> {
        return await this.adminRepository.findAllPosts();
    }
    async listAllSuccessStories(): Promise<any[]> {
        return await this.adminRepository.findAllSuccessStories();
    }
}