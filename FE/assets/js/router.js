// Router Service: manages query params and browser history synchronization

import { state } from './state.js';
import { dataService } from './data-service.js';

class Router {
  constructor() {
    this.isUpdatingFromUrl = false;
  }

  init() {
    this.parseUrlAndApply();

    // Listen for back/forward browser navigation
    window.addEventListener('popstate', () => {
      this.parseUrlAndApply();
    });

    // Listen to state changes and update URL query params smoothly
    state.subscribe((currentState) => {
      if (this.isUpdatingFromUrl) return;
      this.updateUrl(currentState);
    });
  }

  parseUrlAndApply() {
    this.isUpdatingFromUrl = true;
    const params = new URLSearchParams(window.location.search);

    const siteConfig = dataService.getSiteConfig();
    const profilesConfig = dataService.getProfilesConfig();
    const themesConfig = dataService.getThemesConfig();

    const supportedLangs = siteConfig?.supportedLanguages || ['vi', 'en'];
    const defaultLang = siteConfig?.defaultLanguage || 'vi';
    let lang = params.get('lang');
    if (!supportedLangs.includes(lang)) {
      lang = defaultLang;
    }

    const availableProfiles = profilesConfig?.profiles?.map(p => p.id) || ['dotnet-backend', 'fullstack'];
    const defaultProfile = profilesConfig?.defaultProfile || 'dotnet-backend';
    let profileId = params.get('profile');
    if (!availableProfiles.includes(profileId)) {
      profileId = defaultProfile;
    }

    const availableThemes = themesConfig?.themes?.map(t => t.id) || ['minimal', 'dark'];
    const defaultTheme = themesConfig?.defaultTheme || 'minimal';
    let theme = params.get('theme');
    if (!availableThemes.includes(theme)) {
      theme = defaultTheme;
    }

    const supportedViews = siteConfig?.supportedViews || ['portfolio', 'resume'];
    const defaultView = siteConfig?.defaultView || 'portfolio';
    let view = params.get('view');
    if (!supportedViews.includes(view)) {
      view = defaultView;
    }

    state.init({
      lang,
      profileId,
      theme,
      view
    });

    this.isUpdatingFromUrl = false;
  }

  updateUrl(currentState) {
    const siteConfig = dataService.getSiteConfig();
    const profilesConfig = dataService.getProfilesConfig();
    const themesConfig = dataService.getThemesConfig();

    const params = new URLSearchParams();

    // Only add query params if they differ from system defaults, or if view is resume
    if (currentState.profileId && currentState.profileId !== profilesConfig?.defaultProfile) {
      params.set('profile', currentState.profileId);
    }
    if (currentState.lang && currentState.lang !== siteConfig?.defaultLanguage) {
      params.set('lang', currentState.lang);
    }
    if (currentState.theme && currentState.theme !== themesConfig?.defaultTheme) {
      params.set('theme', currentState.theme);
    }
    if (currentState.view && currentState.view !== siteConfig?.defaultView) {
      params.set('view', currentState.view);
    }

    const newQuery = params.toString();
    const newRelativePathQuery = window.location.pathname + (newQuery ? `?${newQuery}` : '');
    
    // Only push state if actual URL changes
    if (window.location.search !== (newQuery ? `?${newQuery}` : '')) {
      window.history.pushState(currentState, '', newRelativePathQuery);
    }
  }
}

export const router = new Router();
