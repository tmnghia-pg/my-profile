// Resume View Component (A4 ATS-Optimized Document Layout)

import { dataService } from '../data-service.js';
import { profileService } from '../profile-service.js';
import { LanguageService } from '../language-service.js';

export function renderResume(container) {
  const profile = dataService.getProfile();
  const experiences = dataService.getExperiences();
  const allProjects = dataService.getProjects();
  const skillsData = dataService.getSkills();
  const education = dataService.getEducation();
  const certificates = dataService.getCertificates();
  const activeProfile = profileService.getActiveProfile();

  const name = LanguageService.getText(profile?.name);
  const headline = LanguageService.getText(activeProfile?.headline || profile?.headline);
  const summary = LanguageService.getText(activeProfile?.summary || profile?.summary);
  const location = LanguageService.getText(profile?.location);
  const phone = profile?.contact?.phone || '';
  const email = profile?.contact?.email || '';
  const linkedin = profile?.contact?.linkedin;
  const github = profile?.contact?.github;
  const website = profile?.contact?.website || 'https://tmnghia-pg.github.io/my-portfolio/';
  const avatarUrl = profile?.avatar || 'assets/images/avatar.png';

  // Ordered Key Projects: SnapFox, TORVEN, MISA BUMAS, MISA LEKIMA, MISA Panda Online
  const targetProjectIds = ['snapfox', 'torven', 'misa-bumas', 'misa-lekima', 'misa-panda-online'];
  const resumeProjects = targetProjectIds
    .map(id => allProjects.find(p => p.id === id))
    .filter(Boolean);

  // Skill items map
  const itemsMap = new Map((skillsData?.items || []).map(i => [i.id, i.name]));

  // Skill groups order: Backend, Frontend, Architecture, Database, Testing, Tools-AI, Libraries
  const groupOrder = ['backend', 'frontend', 'architecture', 'database', 'testing', 'tools-ai', 'libraries'];
  const sortedSkillGroups = [...(skillsData?.groups || [])].sort((a, b) => {
    const aIdx = groupOrder.indexOf(a.id);
    const bIdx = groupOrder.indexOf(b.id);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  container.innerHTML = `
    <article class="resume-view-container" id="resume-document">
      <!-- 1. Resume Header with Avatar Photo Block -->
      <header class="resume-header">
        <div class="resume-header-left">
          <!-- Avatar Block in Resume -->
          <div class="resume-avatar-frame">
            <img src="${avatarUrl}" alt="${name}" class="resume-avatar-img" onerror="this.parentElement.style.display='none'">
          </div>

          <div class="resume-title-block">
            <h1 class="resume-name">${name}</h1>
            <div class="resume-headline">${headline}</div>
            <div class="resume-experience-tag">
              ${LanguageService.getText({
                vi: 'Hơn 3 năm kinh nghiệm (07/2023 – Hiện tại) • Technical Advisor từ 10/2025',
                en: '3+ Years Experience (07/2023 – Present) • Technical Advisor since 10/2025'
              })}
            </div>
          </div>
        </div>

        <div class="resume-contacts-grid">
          <div><strong>Email:</strong> ${email}</div>
          <div><strong>${LanguageService.getText({ vi: 'Điện thoại', en: 'Phone' })}:</strong> ${phone}</div>
          <div><strong>${LanguageService.getText({ vi: 'Địa điểm', en: 'Location' })}:</strong> ${location}</div>
          ${website ? `<div><strong>Web CV:</strong> <a href="${website}" target="_blank" class="resume-link">tmnghia-pg.github.io/my-portfolio</a></div>` : ''}
          ${github ? `<div><strong>GitHub:</strong> <a href="${github}" target="_blank" class="resume-link">github.com/tmnghia-pg</a></div>` : ''}
          ${linkedin ? `<div><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank" class="resume-link">${linkedin}</a></div>` : ''}
        </div>
      </header>

      <!-- 2. Professional Summary -->
      <section class="resume-section">
        <h2 class="resume-section-title">
          <span>${LanguageService.getUi('sections.summary')}</span>
        </h2>
        <div class="resume-summary-text">
          ${(summary || '').split('\n\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')}
        </div>
      </section>

      <!-- 3. Technical Skills -->
      <section class="resume-section">
        <h2 class="resume-section-title">
          <span>${LanguageService.getUi('sections.skills')}</span>
        </h2>
        <div class="resume-skills-list">
          ${sortedSkillGroups.map(grp => {
            const grpName = LanguageService.getText(grp.name);
            const skillNames = (grp.items || []).map(id => itemsMap.get(id)).filter(Boolean).join(', ');
            return `
              <div class="resume-skill-row">
                <span class="resume-skill-label">${grpName}:</span>
                <span class="resume-skill-val">${skillNames}</span>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- 4. Work Experience -->
      <section class="resume-section">
        <h2 class="resume-section-title">
          <span>${LanguageService.getUi('sections.experience')}</span>
        </h2>

        ${experiences.map(exp => {
          const position = LanguageService.getText(exp.position);
          const period = `${exp.startDate} – ${exp.isCurrent ? (LanguageService.getText({ vi: 'Hiện tại', en: 'Present' })) : exp.endDate}`;
          const groups = exp.responsibilityGroups || [];

          return `
            <div class="resume-item">
              <div class="resume-item-header">
                <span class="resume-item-title">${position}</span>
                <span class="resume-item-period">${period}</span>
              </div>
              <div class="resume-item-sub">
                <span>${exp.company} • ${LanguageService.getText(exp.location || { vi: 'Hà Nội, Việt Nam', en: 'Hanoi, Vietnam' })}</span>
                <span class="resume-advisor-badge">
                  ${LanguageService.getText({
                    vi: 'Technical Advisor (Bổ nhiệm từ 10/2025)',
                    en: 'Technical Advisor (Appointed 10/2025)'
                  })}
                </span>
              </div>

              ${groups.length ? `
                <div class="resume-resp-groups">
                  ${groups.map(grp => {
                    const grpTitle = LanguageService.getText(grp.title);
                    const items = grp.items || [];
                    return `
                      <div class="resume-resp-group">
                        <div class="resume-resp-title">${grpTitle}:</div>
                        <ul class="resume-bullets">
                          ${items.map(item => `<li>${LanguageService.getText(item)}</li>`).join('')}
                        </ul>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : `
                <ul class="resume-bullets">
                  ${(exp.highlights || []).map(hl => `<li>${LanguageService.getText(hl)}</li>`).join('')}
                </ul>
              `}
            </div>
          `;
        }).join('')}
      </section>

      <!-- 5. Key Projects -->
      <section class="resume-section">
        <h2 class="resume-section-title">
          <span>${LanguageService.getText({ vi: 'Dự án tiêu biểu (Key Projects)', en: 'Key Projects' })}</span>
        </h2>

        ${resumeProjects.map(prj => {
          const prjRole = LanguageService.getText(prj.role);
          const prjDesc = LanguageService.getText(prj.resumeDescription || prj.description);
          const techList = (prj.technologies || []).map(t => itemsMap.get(t) || t).join(', ');
          const highlights = prj.resumeHighlights 
            ? LanguageService.getText(prj.resumeHighlights)
            : (prj.highlights ? LanguageService.getText(prj.highlights) : []);
          const isEnterprise = prj.category === 'enterprise';
          const typeLabel = isEnterprise ? LanguageService.getUi('projectTypes.enterprise') : LanguageService.getUi('projectTypes.featured');
          const typeBadgeClass = isEnterprise ? 'resume-type-enterprise' : 'resume-type-personal';

          return `
            <div class="resume-item resume-project-item">
              <div class="resume-item-header">
                <span>
                  <strong>${prj.name}</strong>
                  <span class="resume-badge-type ${typeBadgeClass}">${typeLabel}</span>
                  <span class="resume-prj-tagline">(${LanguageService.getText(prj.tagline)})</span>
                </span>
                <span class="resume-prj-role">${prjRole}</span>
              </div>
              <div class="resume-prj-tech">
                <strong>Tech:</strong> ${techList}
              </div>
              <p class="resume-prj-desc">${prjDesc}</p>
              ${highlights && highlights.length ? `
                <ul class="resume-bullets">
                  ${highlights.map(hl => `<li>${hl}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `;
        }).join('')}
      </section>

      <!-- 6. Education & Professional Development -->
      <section class="resume-section">
        <h2 class="resume-section-title">
          <span>${LanguageService.getUi('sections.education')}</span>
        </h2>

        <div class="resume-edu-grid">
          <div>
            <div class="resume-sub-heading">${LanguageService.getText({ vi: 'Học vấn chính quy', en: 'Formal Education' })}:</div>
            ${education.map(edu => {
              const institution = LanguageService.getText(edu.institutionEn && LanguageService.getText({ vi: edu.institution, en: edu.institutionEn }) || edu.institution);
              return `
                <div class="resume-edu-entry">
                  <div class="resume-edu-name"><strong>${institution}</strong></div>
                  <div class="resume-edu-meta">
                    ${LanguageService.getText(edu.degree)} • ${LanguageService.getText(edu.grade)} (${edu.graduationYear})
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div>
            <div class="resume-sub-heading">${LanguageService.getText({ vi: 'Chứng chỉ & Phát triển chuyên môn', en: 'Certifications & Professional Development' })}:</div>
            ${certificates.map(cert => {
              const issuer = LanguageService.getText(cert.issuerEn && LanguageService.getText({ vi: cert.issuer, en: cert.issuerEn }) || cert.issuer);
              return `
                <div class="resume-edu-entry">
                  <div class="resume-edu-name"><strong>${LanguageService.getText(cert.name)}</strong></div>
                  <div class="resume-edu-meta">
                    ${issuer} ${cert.year ? `(${cert.year})` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- 7. Personal Strengths / Soft Skills (Rõ ràng & Giàu thông tin) -->
      <section class="resume-section resume-softskills-section">
        <h2 class="resume-section-title">
          <span>${LanguageService.getUi('sections.softSkills')}</span>
        </h2>
        <div class="resume-softskills-box">
          <div class="resume-softskills-pills">
            <span class="resume-softskill-chip">🤝 <strong>Team Collaboration:</strong> ${LanguageService.getText({ vi: 'Làm việc nhóm & gắn kết đội ngũ', en: 'Cross-functional teamwork' })}</span>
            <span class="resume-softskill-chip">🚀 <strong>Proactiveness:</strong> ${LanguageService.getText({ vi: 'Chủ động đề xuất giải pháp kỹ thuật', en: 'Proactive ownership' })}</span>
            <span class="resume-softskill-chip">💡 <strong>Problem-solving:</strong> ${LanguageService.getText({ vi: 'Tư duy phân tích nguyên nhân gốc rễ', en: 'Analytical root-cause debugging' })}</span>
            <span class="resume-softskill-chip">👥 <strong>Mentorship:</strong> ${LanguageService.getText({ vi: 'Cố vấn kỹ thuật & đào tạo Fresher', en: 'Technical advisor & mentoring' })}</span>
            <span class="resume-softskill-chip">🏆 <strong>Team Engagement:</strong> ${LanguageService.getText({ vi: 'Tổ chức giải đấu thể thao & hoạt động nội bộ', en: 'Team-building & sports events' })}</span>
          </div>
          <div class="resume-softskills-summary">
            ${LanguageService.getText({
              vi: 'Khả năng độc lập phân tích và giải quyết bài toán phức tạp; tinh thần trách nhiệm cao; có năng lực dẫn dắt, kèm cặp nhân sự trẻ và tích cực xây dựng văn hóa đoàn kết tập thể.',
              en: 'Independent problem-solving capacity with high ownership; proven ability to mentor junior engineers and foster cohesive team culture through collaborative activities.'
            })}
          </div>
        </div>
      </section>
    </article>
  `;
}
