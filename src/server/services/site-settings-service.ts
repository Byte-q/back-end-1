import { SiteSettingsRepository } from '../repositories/site-settings-repository';
// import { InsertSiteSetting, SiteSetting } from '../../shared/schema';

export class SiteSettingsService {
  private siteSettingsRepository: SiteSettingsRepository;

  constructor() {
    this.siteSettingsRepository = new SiteSettingsRepository();
  }

  async getSiteSettings() {
    return this.siteSettingsRepository.getSiteSettings();
  }

  async updateSiteSettings(data: any) {
    return this.siteSettingsRepository.updateSiteSettings(data);
  }
}
