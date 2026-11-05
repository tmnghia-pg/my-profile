// Theme Service: manages light/dark themes

import { state } from './state.js';

class ThemeService {
  init() {
    this.applyTheme(state.theme);

    state.subscribe(({ theme }) => {
      this.applyTheme(theme);
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  toggle() {
    const nextTheme = state.theme === 'minimal' ? 'dark' : 'minimal';
    state.setTheme(nextTheme);
  }
}

export const themeService = new ThemeService();
