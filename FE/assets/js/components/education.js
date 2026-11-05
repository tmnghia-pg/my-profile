// Education & Professional Development Component

import { dataService } from '../data-service.js';
import { LanguageService } from '../language-service.js';

export function renderEducation(container) {
  const education = dataService.getEducation();
  const certificates = dataService.getCertificates();
  const interests = dataService.getInterests();

  container.innerHTML = `
    <section id="education" class="section" aria-label="Học vấn và phát triển chuyên môn">
      <div class="container">
        <div class="section-header">
          <div class="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            <span>Credentials & Culture</span>
          </div>
          <h2 class="section-title">${LanguageService.getUi('sections.education')}</h2>
          <p class="section-subtitle">${LanguageService.getUi('sections.educationSub')}</p>
        </div>

        <div class="edu-cert-grid">
          <!-- Column 1: Formal Education -->
          <div>
            <h3 class="edu-column-heading">
              ${LanguageService.getText({ vi: 'Học vấn chính quy', en: 'Formal Education' })}
            </h3>
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              ${education.map(edu => {
                const degree = LanguageService.getText(edu.degree);
                const grade = LanguageService.getText(edu.grade);
                const highlights = LanguageService.getText(edu.highlights);
                const institution = LanguageService.getText(edu.institutionEn && LanguageService.getText({ vi: edu.institution, en: edu.institutionEn }) || edu.institution);

                return `
                  <div class="card edu-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-2);gap:var(--space-2)">
                      <h4 style="font-size:var(--text-base);font-weight:700;color:var(--text-primary)">${institution}</h4>
                      <span class="badge badge-primary">${edu.graduationYear}</span>
                    </div>
                    <div style="font-size:var(--text-sm);color:var(--primary);font-weight:600;margin-bottom:var(--space-2)">
                      ${degree} • ${grade}
                    </div>
                    <p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.6;margin-bottom:0">${highlights}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Column 2: Professional Development & Certifications -->
          <div>
            <h3 class="edu-column-heading">
              ${LanguageService.getText({ vi: 'Chứng chỉ & Phát triển chuyên môn', en: 'Certifications & Professional Development' })}
            </h3>
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              ${certificates.map(cert => {
                const name = LanguageService.getText(cert.name);
                const category = cert.category ? LanguageService.getText(cert.category) : '';
                const description = LanguageService.getText(cert.description);
                const issuer = LanguageService.getText(cert.issuerEn && LanguageService.getText({ vi: cert.issuer, en: cert.issuerEn }) || cert.issuer);

                return `
                  <div class="card cert-card">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-2);gap:var(--space-2)">
                      <div>
                        <h4 style="font-size:var(--text-base);font-weight:700;color:var(--text-primary)">${name}</h4>
                        ${category ? `<span class="badge badge-subtle" style="margin-top:2px">${category}</span>` : ''}
                      </div>
                      ${cert.year ? `<span class="badge badge-primary">${cert.year}</span>` : ''}
                    </div>
                    <div style="font-size:var(--text-sm);color:var(--primary);font-weight:600;margin-bottom:var(--space-2)">
                      ${issuer}
                    </div>
                    <p style="font-size:var(--text-xs);color:var(--text-secondary);line-height:1.6;margin-bottom:0">${description}</p>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Interests & Activities -->
        <div class="interests-container" style="margin-top:var(--space-10)">
          <div class="card" style="padding:var(--space-6)">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-4)">
              <div>
                <h3 style="font-size:var(--text-lg);font-weight:700;color:var(--text-primary);display:flex;align-items:center;gap:var(--space-2)">
                  <span>🎯</span>
                  <span>${LanguageService.getUi('sections.interests')}</span>
                </h3>
                <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-top:2px">
                  ${LanguageService.getUi('sections.interestsSub')}
                </p>
              </div>
              <span class="badge badge-primary">Team Engagement & Well-being</span>
            </div>

            <div class="interest-chips-grid">
              ${interests.map(item => {
                const itemName = LanguageService.getText(item.name);
                const itemDesc = LanguageService.getText(item.description);
                return `
                  <div class="interest-chip" title="${itemDesc}">
                    <span class="interest-chip-icon">${item.icon}</span>
                    <div class="interest-chip-body">
                      <span class="interest-chip-name">${itemName}</span>
                      <span class="interest-chip-desc">${itemDesc}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
