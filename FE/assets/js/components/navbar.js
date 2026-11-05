// Navbar Component

import { LanguageService } from '../language-service.js';
import { dataService } from '../data-service.js';

export function renderNavbar(container) {
  const profile = dataService.getProfile();
  const name = LanguageService.getText(profile?.name);
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'MN';
  const avatarUrl = profile?.avatar || 'assets/images/avatar.png';
  const headline = LanguageService.getText(profile?.headline || { vi: 'Fullstack Developer | .NET Backend Specialist', en: 'Fullstack Developer | .NET Backend Specialist' });

  container.innerHTML = `
    <header class="site-header" role="banner">
      <div class="container">
        <div class="nav-brand-wrap">
          <a href="#hero" class="nav-brand" aria-label="Trang chủ">
            <div class="brand-avatar-wrap" id="brand-avatar-container">
              <div class="brand-avatar">
                <img src="${avatarUrl}" alt="${name}" class="brand-avatar-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                <span class="brand-avatar-fallback" style="display:none">${initials}</span>
              </div>

              <!-- Popup ảnh phóng to khi hover avatar -->
              <div class="avatar-hover-popup" role="tooltip">
                <div class="avatar-hover-photo-wrap">
                  <img src="${avatarUrl}" alt="${name}" class="avatar-hover-photo">
                </div>
                <div class="avatar-hover-info">
                  <div class="avatar-hover-name">${name}</div>
                  <div class="avatar-hover-role">${headline}</div>
                  <div class="avatar-hover-badge">
                    ${LanguageService.getText({
                      vi: 'Hơn 3 năm kinh nghiệm • Technical Advisor từ 10/2025',
                      en: '3+ Years Exp • Technical Advisor since 10/2025'
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div class="brand-text">
              <span class="brand-name">${name}</span>
              <span class="brand-role">Fullstack | .NET Specialist</span>
            </div>
          </a>
        </div>

        <nav class="nav-links" aria-label="Điều hướng chính">
          <a href="#hero" class="nav-link">${LanguageService.getUi('nav.about')}</a>
          <a href="#experience" class="nav-link">${LanguageService.getUi('nav.experience')}</a>
          <a href="#projects" class="nav-link">${LanguageService.getUi('nav.projects')}</a>
          <a href="#skills" class="nav-link">${LanguageService.getUi('nav.skills')}</a>
          <a href="#education" class="nav-link">${LanguageService.getUi('nav.education')}</a>
        </nav>
      </div>
    </header>
  `;
}
