// Footer Component

import { LanguageService } from '../language-service.js';
import { dataService } from '../data-service.js';

export function renderFooter(container) {
  const profile = dataService.getProfile();
  const name = LanguageService.getText(profile?.name);
  const currentYear = new Date().getFullYear();

  container.innerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-content">
        <div class="footer-brand">
          <div style="font-weight:700;font-size:var(--text-base);color:var(--text-primary)">
            ${name}
          </div>
          <div style="font-size:var(--text-xs);color:var(--text-secondary)">
            ${LanguageService.getUi('footer.role')}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:var(--space-1)">
          <div class="footer-credits">
            ${LanguageService.getUi('footer.builtWith')}
          </div>
          <div class="footer-credits">
            © ${currentYear} • ${LanguageService.getUi('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  `;
}
