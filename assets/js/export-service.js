// Export Service: handles printing and saving CV to PDF

import { state } from './state.js';
import { dataService } from './data-service.js';

export class ExportService {
  static printPdf() {
    const originalTitle = document.title;
    const profile = dataService.getProfile();
    const name = profile?.name?.en || 'Tran_Minh_Nghia';
    const role = state.profileId === 'fullstack' ? 'Fullstack_Developer' : 'Senior_DotNet_Developer';
    const filename = `CV_${name.replace(/\s+/g, '_')}_${role}`;

    document.title = filename;

    // Small timeout to allow browser layout to settle before printing
    setTimeout(() => {
      window.print();
      document.title = originalTitle;
    }, 150);
  }
}
