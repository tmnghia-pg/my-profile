// Skills Component

import { dataService } from '../data-service.js';
import { profileService } from '../profile-service.js';
import { LanguageService } from '../language-service.js';

export function renderSkills(container) {
  const skillsData = dataService.getSkills();
  if (!skillsData) return;

  const groupsOrder = profileService.getSkillGroupsOrder();
  const itemsMap = new Map((skillsData.items || []).map(i => [i.id, i]));

  // Sort groups by groupsOrder
  const sortedGroups = [...(skillsData.groups || [])].sort((a, b) => {
    const aIdx = groupsOrder.indexOf(a.id);
    const bIdx = groupsOrder.indexOf(b.id);
    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;
    return 0;
  });

  container.innerHTML = `
    <section id="skills" class="section" aria-label="Kỹ năng chuyên môn">
      <div class="container">
        <div class="section-header">
          <div class="section-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <span>Technical Expertise</span>
          </div>
          <h2 class="section-title">${LanguageService.getUi('sections.skills')}</h2>
          <p class="section-subtitle">${LanguageService.getUi('sections.skillsSub')}</p>
        </div>

        <div class="skills-grid">
          ${sortedGroups.map(grp => {
            const groupName = LanguageService.getText(grp.name);
            const groupSkills = (grp.items || []).map(id => itemsMap.get(id)).filter(Boolean);
            const isBackend = grp.id === 'backend';

            return `
              <div class="skill-cat-card ${isBackend ? 'skill-cat-card-primary' : ''}">
                <div class="skill-cat-header">
                  <div class="skill-cat-title">${groupName}</div>
                  ${isBackend ? `<span class="badge badge-primary">Core Focus</span>` : ''}
                </div>
                <div class="tag-list">
                  ${groupSkills.map(skill => `
                    <span class="tag ${skill.badge ? 'tag-highlight' : ''}">
                      ${skill.name}
                      ${skill.badge ? `<span class="tag-badge-pill">${skill.badge}</span>` : ''}
                    </span>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}
