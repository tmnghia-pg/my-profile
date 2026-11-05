// Projects Component

import { dataService } from '../data-service.js';
import { LanguageService } from '../language-service.js';

export function renderProjects(container) {
  const allProjects = dataService.getProjects();

  const featuredProjects = allProjects.filter(p => p.category === 'featured' && p.status !== 'archived')
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));

  const enterpriseProjects = allProjects.filter(p => p.category === 'enterprise' && p.status !== 'archived')
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));

  const archivedProjects = allProjects.filter(p => p.status === 'archived');

  function renderProjectCard(prj, isFeaturedStyle = false) {
    const name = prj.name;
    const tagline = LanguageService.getText(prj.tagline);
    const description = LanguageService.getText(prj.description);
    const role = LanguageService.getText(prj.role);
    const highlights = prj.highlights ? LanguageService.getText(prj.highlights) : [];
    const isEnterprise = prj.category === 'enterprise';
    
    const categoryBadgeLabel = isEnterprise
      ? '🏢 ' + LanguageService.getUi('projectTypes.enterprise')
      : '🚀 ' + LanguageService.getUi('projectTypes.featured');
    const categoryBadgeClass = isEnterprise ? 'badge-enterprise' : 'badge-personal';
    
    const statusLabel = LanguageService.getUi(`status.${prj.status === 'in-progress' ? 'inProgress' : prj.status}`);
    const statusClass = prj.status === 'active' ? 'badge-success' : (prj.status === 'in-progress' ? 'badge-warning' : '');

    return `
      <div class="card project-card ${isFeaturedStyle ? 'project-featured' : 'project-enterprise'}">
        <div class="project-header">
          <div style="flex:1">
            <div class="project-title-row">
              <h3 class="project-name">${name}</h3>
              <span class="badge ${categoryBadgeClass}">${categoryBadgeLabel}</span>
            </div>
            <div class="project-tagline">${tagline}</div>
          </div>
          <span class="badge ${statusClass}">${statusLabel}</span>
        </div>

        <p class="project-desc">${description}</p>

        ${highlights && highlights.length ? `
          <div class="project-highlights">
            <div class="project-highlights-header">
              <span class="project-highlights-label">${LanguageService.getText({ vi: 'Đóng góp kỹ thuật tiêu biểu:', en: 'Key Technical Contributions:' })}</span>
            </div>
            <ul class="bullet-list" style="margin-bottom:0">
              ${highlights.map(hl => `
                <li class="bullet-item">
                  <span class="bullet-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span>${hl}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="project-footer">
          <div class="project-role-badge">
            <span class="role-icon">👤</span>
            <span class="role-text">${role}</span>
          </div>
          <div class="tag-list">
            ${(prj.technologies || []).map(t => `<span class="tag">#${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <section id="projects" class="section" aria-label="Dự án tiêu biểu">
      <div class="container">
        <!-- Section Header -->
        <div class="section-header">
          <div class="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            <span>Engineering Portfolio</span>
          </div>
          <h2 class="section-title">${LanguageService.getUi('sections.projects')}</h2>
          <p class="section-subtitle">${LanguageService.getUi('sections.projectsSub')}</p>
        </div>

        <!-- 1. Featured Independent & AI-First Products (Top Priority) -->
        <div class="project-subgroup">
          <div class="project-subgroup-header">
            <div class="project-subgroup-title-wrap">
              <span class="project-subgroup-badge badge-featured">Priority Showcase</span>
              <h3 class="project-subgroup-title">${LanguageService.getUi('sections.featuredProjects')}</h3>
            </div>
            <p class="project-subgroup-desc">
              ${LanguageService.getText({
                vi: 'Các sản phẩm phần mềm phát triển độc lập và ứng dụng AI Coding toàn diện từ kiến trúc đến vận hành.',
                en: 'Independent end-to-end software products and AI-first engineering implementations.'
              })}
            </p>
          </div>

          <div class="projects-grid projects-featured-grid">
            ${featuredProjects.map(prj => renderProjectCard(prj, true)).join('')}
          </div>
        </div>

        <!-- 2. Enterprise Platforms (MISA) -->
        <div class="project-subgroup" style="margin-top:var(--space-12)">
          <div class="project-subgroup-header">
            <div class="project-subgroup-title-wrap">
              <span class="project-subgroup-badge badge-enterprise">Enterprise Scale</span>
              <h3 class="project-subgroup-title">${LanguageService.getUi('sections.enterpriseProjects')}</h3>
            </div>
            <p class="project-subgroup-desc">
              ${LanguageService.getText({
                vi: 'Các nền tảng phần mềm tài chính công, quản lý ngân sách và kế toán chuyên ngành tại Công ty Cổ phần MISA.',
                en: 'Public finance, state budget management, and specialized legal accounting platforms at MISA JSC.'
              })}
            </p>
          </div>

          <div class="projects-grid projects-enterprise-grid">
            ${enterpriseProjects.map(prj => renderProjectCard(prj, false)).join('')}
          </div>
        </div>

        <!-- 3. Archived / Additional Projects (Collapsible) -->
        ${archivedProjects.length ? `
          <div class="archived-projects-wrap" style="margin-top:var(--space-10)">
            <details class="archived-details">
              <summary class="archived-summary">
                <span>📁 ${LanguageService.getText({ vi: 'Dự án đã lưu trữ / Nền tảng trước đây (1)', en: 'Archived / Early Projects (1)' })}</span>
                <span class="archived-hint">${LanguageService.getText({ vi: 'Click để xem', en: 'Click to expand' })}</span>
              </summary>
              <div class="projects-grid" style="margin-top:var(--space-4)">
                ${archivedProjects.map(prj => renderProjectCard(prj, false)).join('')}
              </div>
            </details>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}
