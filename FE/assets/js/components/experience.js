// Experience Timeline Component

import { dataService } from '../data-service.js';
import { LanguageService } from '../language-service.js';

export function renderExperience(container) {
  const experiences = dataService.getExperiences();

  container.innerHTML = `
    <section id="experience" class="section" aria-label="Kinh nghiệm làm việc">
      <div class="container">
        <div class="section-header">
          <div class="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>Career & Ownership</span>
          </div>
          <h2 class="section-title">${LanguageService.getUi('sections.experience')}</h2>
          <p class="section-subtitle">${LanguageService.getUi('sections.experienceSub')}</p>
        </div>

        <div class="timeline">
          ${experiences.map(exp => {
            const position = LanguageService.getText(exp.position);
            const summary = LanguageService.getText(exp.summary);
            const period = `${exp.startDate} – ${exp.isCurrent ? (LanguageService.getText({ vi: 'Hiện tại', en: 'Present' })) : exp.endDate}`;
            const groups = exp.responsibilityGroups || [];

            return `
              <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="exp-card">
                  <div class="exp-header">
                    <div class="exp-title-block">
                      <h3>${position}</h3>
                      <div class="exp-company-line">
                        <span class="exp-company">${exp.company}</span>
                        <span class="exp-location">• ${LanguageService.getText(exp.location || { vi: 'Hà Nội, Việt Nam', en: 'Hanoi, Vietnam' })}</span>
                      </div>
                    </div>
                    <span class="exp-period">${period}</span>
                  </div>

                  <p class="exp-summary">${summary}</p>

                  <!-- 4 Structured Responsibility Groups -->
                  ${groups.length ? `
                    <div class="responsibility-groups-grid">
                      ${groups.map(grp => {
                        const grpTitle = LanguageService.getText(grp.title);
                        const items = grp.items || [];
                        return `
                          <div class="responsibility-group-card">
                            <div class="responsibility-group-header">
                              <span class="resp-dot"></span>
                              <h4 class="responsibility-group-title">${grpTitle}</h4>
                            </div>
                            <ul class="bullet-list resp-bullet-list">
                              ${items.map(item => `
                                <li class="bullet-item">
                                  <span class="bullet-icon">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  </span>
                                  <span>${LanguageService.getText(item)}</span>
                                </li>
                              `).join('')}
                            </ul>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  ` : `
                    <ul class="bullet-list">
                      ${(exp.highlights || []).map(hl => `
                        <li class="bullet-item">
                          <span class="bullet-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          <span>${LanguageService.getText(hl)}</span>
                        </li>
                      `).join('')}
                    </ul>
                  `}

                  <div class="exp-footer">
                    <span class="exp-tech-label">Core Tech & Practices:</span>
                    <div class="tag-list">
                      ${(exp.skillIds || []).map(skillId => `
                        <span class="tag">#${skillId}</span>
                      `).join('')}
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}
