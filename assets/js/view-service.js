// View Service: manages switching between Portfolio and Resume views

import { state } from './state.js';

class ViewService {
  init() {
    this.applyView(state.view);

    state.subscribe(({ view }) => {
      this.applyView(view);
    });
  }

  applyView(view) {
    document.body.setAttribute('data-view', view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggle() {
    const nextView = state.view === 'portfolio' ? 'resume' : 'portfolio';
    state.setView(nextView);
  }
}

export const viewService = new ViewService();
