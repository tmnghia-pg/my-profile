// Profile Service: handles switching between target roles (.NET Backend vs Full-stack)

import { state } from './state.js';
import { dataService } from './data-service.js';

class ProfileService {
  getActiveProfile() {
    const profilesConfig = dataService.getProfilesConfig();
    if (!profilesConfig || !profilesConfig.profiles) return null;
    return profilesConfig.profiles.find(p => p.id === state.profileId) || profilesConfig.profiles[0];
  }

  getProfilesList() {
    const profilesConfig = dataService.getProfilesConfig();
    return profilesConfig?.profiles || [];
  }

  getVisibleSections() {
    const active = this.getActiveProfile();
    return active?.visibleSections || ['summary', 'skills', 'experience', 'projects', 'education', 'certificates'];
  }

  getFeaturedProjectIds() {
    const active = this.getActiveProfile();
    return active?.featuredProjectIds || [];
  }

  getSkillGroupsOrder() {
    const active = this.getActiveProfile();
    return active?.skillGroupsOrder || ['backend', 'frontend', 'architecture', 'database', 'testing', 'tools-ai', 'libraries'];
  }
}

export const profileService = new ProfileService();
