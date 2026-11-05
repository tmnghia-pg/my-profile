// Data Service: loads and validates JSON content

class DataService {
  constructor() {
    this.cache = new Map();
    this.isLoaded = false;
  }

  async fetchJson(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status} loading ${path}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`[DataService] Failed to load ${path}:`, error);
      throw error;
    }
  }

  async loadAll() {
    try {
      const [
        profile,
        experiences,
        projects,
        skills,
        education,
        certificates,
        interests,
        profilesConfig,
        themesConfig,
        siteConfig
      ] = await Promise.all([
        this.fetchJson('./data/profile.json'),
        this.fetchJson('./data/experiences.json'),
        this.fetchJson('./data/projects.json'),
        this.fetchJson('./data/skills.json'),
        this.fetchJson('./data/education.json'),
        this.fetchJson('./data/certificates.json'),
        this.fetchJson('./data/interests.json'),
        this.fetchJson('./data/config/profiles.json'),
        this.fetchJson('./data/config/themes.json'),
        this.fetchJson('./data/config/site.json')
      ]);

      this.cache.set('profile', profile);
      this.cache.set('experiences', experiences);
      this.cache.set('projects', projects);
      this.cache.set('skills', skills);
      this.cache.set('education', education);
      this.cache.set('certificates', certificates);
      this.cache.set('interests', interests);
      this.cache.set('profilesConfig', profilesConfig);
      this.cache.set('themesConfig', themesConfig);
      this.cache.set('siteConfig', siteConfig);

      this.validateData();
      this.isLoaded = true;
      return true;
    } catch (err) {
      console.error('[DataService] Critical initialization failure:', err);
      return false;
    }
  }

  validateData() {
    const profile = this.cache.get('profile');
    if (!profile || !profile.name || !profile.contact) {
      console.warn('[DataService] Validation warning: profile data missing essential fields.');
    }
    const projects = this.cache.get('projects');
    if (!projects || !Array.isArray(projects.items)) {
      console.warn('[DataService] Validation warning: projects data structure invalid.');
    }
  }

  getProfile() {
    return this.cache.get('profile');
  }

  getExperiences() {
    return this.cache.get('experiences')?.items || [];
  }

  getProjects() {
    return this.cache.get('projects')?.items || [];
  }

  getSkills() {
    return this.cache.get('skills');
  }

  getEducation() {
    return this.cache.get('education')?.items || [];
  }

  getCertificates() {
    return this.cache.get('certificates')?.items || [];
  }

  getInterests() {
    return this.cache.get('interests')?.items || [];
  }

  getProfilesConfig() {
    return this.cache.get('profilesConfig');
  }

  getThemesConfig() {
    return this.cache.get('themesConfig');
  }

  getSiteConfig() {
    return this.cache.get('siteConfig');
  }
}

export const dataService = new DataService();
