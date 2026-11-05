// Main Application Entrypoint

import { dataService } from './data-service.js';
import { state } from './state.js';
import { router } from './router.js';
import { themeService } from './theme-service.js';
import { viewService } from './view-service.js';
import { LanguageService } from './language-service.js';

// Components
import { renderNavbar } from './components/navbar.js';
import { renderToolbar } from './components/toolbar.js';
import { renderHero } from './components/hero.js';
import { renderExperience } from './components/experience.js';
import { renderProjects } from './components/projects.js';
import { renderSkills } from './components/skills.js';
import { renderEducation } from './components/education.js';
import { renderResume } from './components/resume.js';
import { renderFooter } from './components/footer.js';

class App {
  async init() {
    const appRoot = document.getElementById('app');
    if (!appRoot) {
      console.error('[App] Root element #app not found.');
      return;
    }

    // Display temporary loading indicator
    appRoot.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;color:var(--text-secondary)">
        <div style="text-align:center">
          <div style="display:inline-block;width:32px;height:32px;border:3px solid rgba(56,189,248,0.2);border-top-color:#38bdf8;border-radius:50%;animation:spin 0.8s linear infinite"></div>
          <div style="margin-top:12px;font-size:14px;font-weight:600">Loading CV / Portfolio Data...</div>
        </div>
      </div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `;

    const success = await dataService.loadAll();
    if (!success) {
      this.renderLoadError(appRoot);
      return;
    }

    // Setup basic DOM layout
    appRoot.innerHTML = `
      <div id="nav-mount"></div>
      <main id="main-content">
        <div class="portfolio-view-container">
          <div id="hero-mount"></div>
          <div id="experience-mount"></div>
          <div id="projects-mount"></div>
          <div id="skills-mount"></div>
          <div id="education-mount"></div>
        </div>
        <div id="resume-mount"></div>
      </main>
      <div id="footer-mount"></div>
      <div id="toolbar-mount"></div>
    `;

    // Initialize core services
    themeService.init();
    viewService.init();
    router.init(); // parses URL queries and populates state

    // Initial render
    this.renderAll();

    // Re-render when state changes
    state.subscribe(() => {
      this.renderAll();
      this.updateMetadata();
    });

    this.updateMetadata();
  }

  renderAll() {
    const navMount = document.getElementById('nav-mount');
    const heroMount = document.getElementById('hero-mount');
    const expMount = document.getElementById('experience-mount');
    const prjMount = document.getElementById('projects-mount');
    const skillsMount = document.getElementById('skills-mount');
    const eduMount = document.getElementById('education-mount');
    const resumeMount = document.getElementById('resume-mount');
    const footerMount = document.getElementById('footer-mount');
    const toolbarMount = document.getElementById('toolbar-mount');

    if (navMount) renderNavbar(navMount);
    if (heroMount) renderHero(heroMount);
    if (expMount) renderExperience(expMount);
    if (prjMount) renderProjects(prjMount);
    if (skillsMount) renderSkills(skillsMount);
    if (eduMount) renderEducation(eduMount);
    if (resumeMount) renderResume(resumeMount);
    if (footerMount) renderFooter(footerMount);
    if (toolbarMount) renderToolbar(toolbarMount);
  }

  updateMetadata() {
    const siteConfig = dataService.getSiteConfig();
    const lang = state.lang || 'vi';
    const meta = siteConfig?.metadata?.[lang];
    if (meta) {
      document.title = meta.title || 'Trần Minh Nghĩa | .NET Developer Portfolio';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', meta.description);
      }
    }
    document.documentElement.lang = lang;
  }

  renderLoadError(container) {
    container.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#0f172a;color:#f8fafc;font-family:sans-serif">
        <div style="max-width:540px;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:32px;box-shadow:0 20px 40px rgba(0,0,0,0.4)">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;color:#f87171">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <h2 style="font-size:20px;font-weight:700;margin:0">Cần chạy qua Local HTTP Server</h2>
          </div>
          <p style="font-size:14px;color:#cbd5e1;line-height:1.6;margin-bottom:16px">
            Do chính sách bảo mật CORS của trình duyệt, việc đọc các file JSON qua giao thức <code>file://</code> bị chặn. Vui lòng mở website qua máy chủ web cục bộ (Local HTTP Server).
          </p>
          <div style="background:#0b0f19;border:1px solid #1e293b;padding:12px 16px;border-radius:8px;font-family:monospace;font-size:13px;color:#38bdf8;margin-bottom:20px">
            npx serve .<br/>
            # hoặc chạy qua VS Code Live Server
          </div>
          <button onclick="location.reload()" style="background:#0284c7;color:#fff;border:none;padding:10px 20px;border-radius:8px;font-weight:600;cursor:pointer">
            Thử tải lại
          </button>
        </div>
      </div>
    `;
  }
}

// Bootstrap app on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
