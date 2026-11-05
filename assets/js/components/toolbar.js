// Floating Control Toolbar Component

import { state } from '../state.js';
import { themeService } from '../theme-service.js';
import { viewService } from '../view-service.js';
import { profileService } from '../profile-service.js';
import { LanguageService } from '../language-service.js';
import { ExportService } from '../export-service.js';

export function renderToolbar(container) {
  const currentSnapshot = state.getSnapshot();
  const profiles = profileService.getProfilesList();

  const isResume = currentSnapshot.view === 'resume';
  const isDark = currentSnapshot.theme === 'dark';
  const isEn = currentSnapshot.lang === 'en';

  container.innerHTML = `
    <aside class="floating-bar" aria-label="Bảng điều khiển nhanh">
      <!-- View Switcher -->
      <div class="toolbar-group">
        <button 
          id="btn-toggle-view"
          class="btn btn-pill ${isResume ? 'active' : ''}" 
          title="${isResume ? LanguageService.getUi('actions.viewPortfolio') : LanguageService.getUi('actions.viewResume')}"
          aria-label="${isResume ? LanguageService.getUi('actions.viewPortfolio') : LanguageService.getUi('actions.viewResume')}"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${isResume 
              ? '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>' 
              : '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>'}
          </svg>
          <span class="toolbar-text-label">${isResume ? 'Portfolio' : 'Resume (CV)'}</span>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Profile Selector -->
      <div class="toolbar-group">
        ${profiles.map(p => `
          <button 
            class="btn btn-pill profile-btn ${currentSnapshot.profileId === p.id ? 'active' : ''}" 
            data-profile-id="${p.id}"
            title="${LanguageService.getText(p.name)}"
          >
            ${p.id === 'dotnet-backend' ? '.NET Specialist' : 'Fullstack'}
          </button>
        `).join('')}
      </div>

      <div class="toolbar-divider"></div>

      <!-- Language Toggle -->
      <div class="toolbar-group">
        <button 
          id="btn-toggle-lang"
          class="btn btn-pill" 
          title="Switch Language"
        >
          ${isEn ? '<strong>EN</strong> / vi' : '<strong>VI</strong> / en'}
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Theme Toggle -->
      <div class="toolbar-group">
        <button 
          id="btn-toggle-theme"
          class="btn btn-icon btn-ghost" 
          title="${isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}"
          aria-label="Toggle Theme"
        >
          ${isDark 
            ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--primary)"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
            : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
          }
        </button>

        <!-- Print/PDF Export Button -->
        <button 
          id="btn-print-pdf"
          class="btn btn-icon btn-ghost" 
          title="${LanguageService.getUi('actions.printPdf')}"
          aria-label="${LanguageService.getUi('actions.printPdf')}"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
        </button>
      </div>
    </aside>
  `;

  // Bind Event Listeners
  const btnToggleView = container.querySelector('#btn-toggle-view');
  if (btnToggleView) {
    btnToggleView.onclick = () => viewService.toggle();
  }

  const profileBtns = container.querySelectorAll('.profile-btn');
  profileBtns.forEach(btn => {
    btn.onclick = () => {
      const pid = btn.getAttribute('data-profile-id');
      state.setProfile(pid);
    };
  });

  const btnToggleLang = container.querySelector('#btn-toggle-lang');
  if (btnToggleLang) {
    btnToggleLang.onclick = () => {
      state.setLang(state.lang === 'vi' ? 'en' : 'vi');
    };
  }

  const btnToggleTheme = container.querySelector('#btn-toggle-theme');
  if (btnToggleTheme) {
    btnToggleTheme.onclick = () => themeService.toggle();
  }

  const btnPrintPdf = container.querySelector('#btn-print-pdf');
  if (btnPrintPdf) {
    btnPrintPdf.onclick = () => ExportService.printPdf();
  }
}
