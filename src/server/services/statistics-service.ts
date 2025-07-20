import { StatisticsRepository } from '../repositories/statistics-repository';

export class StatisticsService {
  private statisticsRepository: StatisticsRepository;

  constructor() {
    this.statisticsRepository = new StatisticsRepository();
  }

  async getStatistics(id: string) {
    return this.statisticsRepository.getStatistics(id);
  }

  async updateStatistics(id: string, data: any) {
    return this.statisticsRepository.updateStatistics(id, data);
  }

  async createStatistic(data: any) {
    return this.statisticsRepository.createStatistic(data);
  }

  async listStatistics() {
    return this.statisticsRepository.listStatistics();
  }

  async updateStatistic(id: string, data: any) {
    return this.statisticsRepository.updateStatistics(id, data);
  }

  async deleteStatistic(id: string) {
    return this.statisticsRepository.deleteStatistic(id);
  }

  async getStatisticByType(type: string) {
    return this.statisticsRepository.getStatisticByType(type);
  }

}
