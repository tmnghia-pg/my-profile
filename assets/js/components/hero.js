// Hero Component

import { dataService } from '../data-service.js';
import { profileService } from '../profile-service.js';
import { LanguageService } from '../language-service.js';
import { viewService } from '../view-service.js';
import { ExportService } from '../export-service.js';
import { copyToClipboard } from '../utils/toast.js';

export function renderHero(container) {
  const profile = dataService.getProfile();
  const activeProfileConfig = profileService.getActiveProfile();

  const name = LanguageService.getText(profile?.name);
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'MN';
  const headline = LanguageService.getText(activeProfileConfig?.headline || profile?.headline);
  const summary = LanguageService.getText(activeProfileConfig?.summary || profile?.summary);
  const location = LanguageService.getText(profile?.location);
  const phone = profile?.contact?.phone || '';
  const email = profile?.contact?.email || '';
  const linkedin = profile?.contact?.linkedin;
  const github = profile?.contact?.github;
  const website = profile?.contact?.website;
  const avatarUrl = profile?.avatar || 'assets/images/avatar.png';

  container.innerHTML = `
    <section id="hero" class="hero-section" aria-label="Giới thiệu bản thân">
      <div class="container">
        <div class="hero-grid">
          <!-- Left Column: Identity & Contact -->
          <div class="hero-main">
            <div class="hero-header-line">
              <!-- Avatar with hover popup preview -->
              <div class="hero-avatar-wrap">
                <div class="hero-avatar">
                  <img src="${avatarUrl}" alt="${name}" class="hero-avatar-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                  <span class="hero-avatar-fallback" style="display:none">${initials}</span>
                </div>
                <!-- Large Photo Hover Popup -->
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

              <div class="hero-status-pill">
                <span class="status-dot"></span>
                <span>${LanguageService.getUi('status.available')}</span>
              </div>
            </div>

            <h1 class="hero-name">${name}</h1>
            <div class="hero-headline">${headline}</div>
            <div class="hero-summary">
              ${(summary || '').split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')}
            </div>

            <div class="hero-contacts">
              <div class="contact-chip" id="chip-email" title="Click để sao chép Email" role="button" tabindex="0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>${email}</span>
              </div>

              <div class="contact-chip" id="chip-phone" title="Click để sao chép Số điện thoại" role="button" tabindex="0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>${phone}</span>
              </div>

              <div class="contact-chip">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${location}</span>
              </div>

              ${website ? `
                <a href="${website}" target="_blank" rel="noopener noreferrer" class="contact-chip" title="CV / Portfolio Website">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>tmnghia-pg.github.io</span>
                </a>
              ` : ''}

              ${github ? `
                <a href="${github}" target="_blank" rel="noopener noreferrer" class="contact-chip" title="GitHub Profile">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
              ` : ''}

              ${linkedin ? `
                <a href="${linkedin}" target="_blank" rel="noopener noreferrer" class="contact-chip" title="LinkedIn Profile">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              ` : ''}
            </div>

            <div class="hero-actions">
              <button id="hero-btn-resume" class="btn btn-primary" aria-label="${LanguageService.getUi('actions.viewResume')}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <span>${LanguageService.getUi('actions.viewResume')}</span>
              </button>

              <button id="hero-btn-print" class="btn btn-outline" aria-label="${LanguageService.getUi('actions.printPdf')}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>${LanguageService.getUi('actions.printPdf')}</span>
              </button>
            </div>
          </div>

          <!-- Right Column / Technical Highlights (2-column responsive grid) -->
          <div class="hero-sidebar">
            <div class="hero-card">
              <div class="hero-card-header">
                <span class="hero-card-title">${LanguageService.getUi('technicalHighlights.title')}</span>
                <span class="badge badge-primary">${LanguageService.getUi('technicalHighlights.badge')}</span>
              </div>

              <div class="highlights-grid">
                <!-- 1. Independent Product Development -->
                <div class="highlight-item">
                  <div class="highlight-icon">🚀</div>
                  <div class="highlight-details">
                    <span class="highlight-title">${LanguageService.getUi('technicalHighlights.independent.title')}</span>
                    <span class="highlight-desc">${LanguageService.getUi('technicalHighlights.independent.desc')}</span>
                  </div>
                </div>

                <!-- 2. AI-First Software Engineering -->
                <div class="highlight-item">
                  <div class="highlight-icon">⚡</div>
                  <div class="highlight-details">
                    <span class="highlight-title">${LanguageService.getUi('technicalHighlights.aiFirst.title')}</span>
                    <span class="highlight-desc">${LanguageService.getUi('technicalHighlights.aiFirst.desc')}</span>
                  </div>
                </div>

                <!-- 3. Technical Advisor & Mentorship -->
                <div class="highlight-item">
                  <div class="highlight-icon">👥</div>
                  <div class="highlight-details">
                    <span class="highlight-title">${LanguageService.getUi('technicalHighlights.advisor.title')}</span>
                    <span class="highlight-desc">
                      ${LanguageService.getText({
                        vi: 'Đảm nhận vai trò Technical Advisor từ 10/2025 sau chương trình MISA – Cán bộ nguồn. Trực tiếp hướng dẫn và hỗ trợ 3 Fresher vượt qua thử việc, đồng thời định hướng tư duy kỹ thuật trong dự án.',
                        en: 'Served as Technical Advisor since October 2025 following the MISA Future Leader program. Directly mentored and guided 3 Fresher developers through probation while shaping engineering mindsets on project teams.'
                      })}
                    </span>
                  </div>
                </div>

                <!-- 4. Team Organization & Engagement -->
                <div class="highlight-item">
                  <div class="highlight-icon">🤝</div>
                  <div class="highlight-details">
                    <span class="highlight-title">${LanguageService.getUi('technicalHighlights.leadership.title')}</span>
                    <span class="highlight-desc">${LanguageService.getUi('technicalHighlights.leadership.desc')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach Event Handlers
  const chipEmail = container.querySelector('#chip-email');
  if (chipEmail) {
    chipEmail.onclick = () => copyToClipboard(email, `${LanguageService.getUi('actions.copyDone')} (${email})`);
    chipEmail.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chipEmail.click(); } };
  }

  const chipPhone = container.querySelector('#chip-phone');
  if (chipPhone) {
    chipPhone.onclick = () => copyToClipboard(phone, `${LanguageService.getUi('actions.copyDone')} (${phone})`);
    chipPhone.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chipPhone.click(); } };
  }

  const btnResume = container.querySelector('#hero-btn-resume');
  if (btnResume) {
    btnResume.onclick = () => viewService.toggle();
  }

  const btnPrint = container.querySelector('#hero-btn-print');
  if (btnPrint) {
    btnPrint.onclick = () => ExportService.printPdf();
  }
}
