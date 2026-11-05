// Application State Management

class State {
  constructor() {
    this.lang = 'vi';
    this.theme = 'minimal';
    this.profileId = 'dotnet-backend';
    this.view = 'portfolio';
    this.listeners = new Set();
  }

  init(initialState = {}) {
    if (initialState.lang) this.lang = initialState.lang;
    if (initialState.theme) this.theme = initialState.theme;
    if (initialState.profileId) this.profileId = initialState.profileId;
    if (initialState.view) this.view = initialState.view;
    this.notify();
  }

  setLang(lang) {
    if (this.lang === lang) return;
    this.lang = lang;
    this.notify();
  }

  setTheme(theme) {
    if (this.theme === theme) return;
    this.theme = theme;
    this.notify();
  }

  setProfile(profileId) {
    if (this.profileId === profileId) return;
    this.profileId = profileId;
    this.notify();
  }

  setView(view) {
    if (this.view === view) return;
    this.view = view;
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        lang: this.lang,
        theme: this.theme,
        profileId: this.profileId,
        view: this.view
      });
    }
  }

  getSnapshot() {
    return {
      lang: this.lang,
      theme: this.theme,
      profileId: this.profileId,
      view: this.view
    };
  }
}

export const state = new State();
