// Language & Localization Service

import { state } from './state.js';

const UI_DICTIONARY = {
  vi: {
    nav: {
      about: 'Giới thiệu',
      experience: 'Kinh nghiệm',
      projects: 'Dự án',
      skills: 'Kỹ năng',
      education: 'Học vấn',
      contact: 'Liên hệ'
    },
    status: {
      available: 'Định hướng: Senior .NET Developer / .NET Backend',
      active: 'Đang hoạt động',
      inProgress: 'Đang phát triển',
      archived: 'Đã lưu trữ',
      featured: 'Tiêu biểu'
    },
    projectTypes: {
      featured: 'Dự án Tiêu biểu',
      enterprise: 'Doanh nghiệp (MISA)',
      personal: 'Dự án cá nhân',
      archived: 'Lưu trữ'
    },
    sections: {
      summary: 'Tóm tắt nghề nghiệp',
      experience: 'Kinh nghiệm làm việc',
      experienceSub: 'Hành trình chuyên môn và đóng góp kỹ thuật tại Công ty Cổ phần MISA (07/2023 – Hiện tại)',
      projects: 'Dự án',
      projectsSub: 'Các sản phẩm độc lập, giải pháp AI-first và nền tảng doanh nghiệp đã tham gia xây dựng',
      featuredProjects: 'Dự án Tiêu biểu (Sản phẩm độc lập & AI-First)',
      enterpriseProjects: 'Dự án Doanh nghiệp (Nền tảng MISA)',
      skills: 'Kỹ năng chuyên môn',
      skillsSub: 'Nền tảng kỹ thuật Backend .NET, Frontend, kiến trúc và công cụ kỹ thuật',
      education: 'Học vấn & Phát triển chuyên môn',
      educationSub: 'Bằng cấp kỹ sư chính quy và chương trình đào tạo cán bộ nguồn',
      interests: 'Sở thích & Hoạt động phong trào',
      interestsSub: 'Thể thao, âm nhạc, tinh thần tự học công nghệ và hoạt động phong trào đội ngũ',
      softSkills: 'Kỹ năng mềm & Tinh thần làm việc'
    },
    actions: {
      viewResume: 'Chế độ CV A4',
      viewPortfolio: 'Chế độ Portfolio',
      printPdf: 'Tải / In PDF',
      copyEmail: 'Sao chép Email',
      copyPhone: 'Sao chép Điện thoại',
      copyDone: 'Đã sao chép vào bộ nhớ tạm!',
      contactMe: 'Liên hệ ngay',
      viewAllProjects: 'Xem tất cả dự án'
    },
    metrics: {
      reportMetric: 'Đáp ứng ~90% mẫu báo cáo thực tế qua Custom Reporting Engine',
      advisorMetric: 'Đào tạo và hỗ trợ 3 Fresher vượt qua thử việc',
      architectureMetric: 'Thiết kế theo Clean Architecture & .NET 8 chuẩn mực'
    },
    technicalHighlights: {
      title: 'Technical Highlights',
      badge: 'Core Competencies',
      independent: {
        title: 'Independent Product Development',
        desc: 'Độc lập nghiên cứu, thiết kế và phát triển hệ thống SnapFox Print LLC từ đầu. Xây dựng giải pháp end-to-end gồm website đặt hàng và phần mềm SnapFoxFactory quản lý toàn bộ quy trình vận hành xưởng in.'
      },
      aiFirst: {
        title: 'AI-First Software Engineering',
        desc: 'Ứng dụng AI Coding xuyên suốt quá trình phát triển TORVEN, từ phân tích yêu cầu đến triển khai. Hoàn thiện hệ thống CMS quản trị toàn diện, tích hợp Zalo OA và thanh toán trực tuyến.'
      },
      advisor: {
        title: 'Technical Advisor & Mentorship',
        desc: 'Đảm nhận vai trò Technical Advisor sau chương trình MISA – Cán bộ nguồn. Trực tiếp hướng dẫn và hỗ trợ 3 Fresher vượt qua thử việc, đồng thời định hướng tư duy kỹ thuật trong dự án.'
      },
      leadership: {
        title: 'Team Organization & Engagement',
        desc: 'Từng đảm nhiệm vai trò thủ quỹ và trưởng ban phong trào. Chủ động tổ chức giải đấu thể thao, sự kiện giao lưu và hoạt động nội bộ, góp phần xây dựng tinh thần đoàn kết và gắn kết đội nhóm.'
      }
    },
    footer: {
      role: 'Fullstack Developer | .NET Backend Specialist',
      builtWith: 'Xây dựng với Vanilla HTML, CSS & JavaScript ES Modules • Shared JSON Data Source',
      rights: 'Bản quyền nội dung thuộc về Trần Minh Nghĩa'
    }
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact'
    },
    status: {
      available: 'Target: Senior .NET Developer / .NET Backend',
      active: 'Active Production',
      inProgress: 'In Development',
      archived: 'Archived',
      featured: 'Featured'
    },
    projectTypes: {
      featured: 'Featured Product',
      enterprise: 'Enterprise (MISA)',
      personal: 'Personal Project',
      archived: 'Archived'
    },
    sections: {
      summary: 'Professional Summary',
      experience: 'Work Experience',
      experienceSub: 'Professional tenure and engineering contributions at MISA JSC (07/2023 – Present)',
      projects: 'Projects',
      projectsSub: 'Independent products, AI-first platforms, and enterprise solutions built with modern stacks',
      featuredProjects: 'Featured Projects (Independent & AI-First Products)',
      enterpriseProjects: 'Enterprise Projects (MISA Platforms)',
      skills: 'Technical Skills',
      skillsSub: 'Backend .NET core, frontend systems, architecture, and engineering toolchain',
      education: 'Education & Professional Development',
      educationSub: 'Formal engineering degree and key personnel management development programs',
      interests: 'Interests & Activities',
      interestsSub: 'Sports, music, self-driven continuous learning, and team engagement activities',
      softSkills: 'Personal Strengths & Soft Skills'
    },
    actions: {
      viewResume: 'Resume A4 View',
      viewPortfolio: 'Portfolio View',
      printPdf: 'Export / Print PDF',
      copyEmail: 'Copy Email',
      copyPhone: 'Copy Phone',
      copyDone: 'Copied to clipboard!',
      contactMe: 'Get in Touch',
      viewAllProjects: 'View All Projects'
    },
    metrics: {
      reportMetric: 'Fulfills ~90% of dynamic report formats via custom engine',
      advisorMetric: 'Mentored & guided 3 Fresher engineers through probation',
      architectureMetric: 'Robust Clean Architecture & .NET 8 implementation'
    },
    technicalHighlights: {
      title: 'Technical Highlights',
      badge: 'Core Competencies',
      independent: {
        title: 'Independent Product Development',
        desc: 'Independently researched, designed, and developed the SnapFox Print LLC platform from scratch. Built an end-to-end solution combining a customer ordering website and SnapFoxFactory software managing all print shop operations.'
      },
      aiFirst: {
        title: 'AI-First Software Engineering',
        desc: "Applied AI Coding throughout TORVEN's development lifecycle from requirement analysis to deployment. Delivered a comprehensive admin CMS with Zalo OA and online banking integration."
      },
      advisor: {
        title: 'Technical Advisor & Mentorship',
        desc: 'Served as Technical Advisor following the MISA Future Leader program. Directly mentored and guided 3 Fresher developers through probation while shaping engineering mindsets on project teams.'
      },
      leadership: {
        title: 'Team Organization & Engagement',
        desc: 'Served as team treasurer and activities lead. Proactively organized athletic tournaments, networking events, and internal activities, fostering teamwork and team solidarity.'
      }
    },
    footer: {
      role: 'Fullstack Developer | .NET Backend Specialist',
      builtWith: 'Built with Vanilla HTML, CSS & JavaScript ES Modules • Shared JSON Data Source',
      rights: 'All profile content copyright Tran Minh Nghia'
    }
  }
};

export class LanguageService {
  static getText(field) {
    if (!field) return '';
    if (typeof field === 'string') return field;
    const currentLang = state.lang || 'vi';
    return field[currentLang] || field['vi'] || field['en'] || '';
  }

  static getUi(path) {
    const lang = state.lang || 'vi';
    const dict = UI_DICTIONARY[lang] || UI_DICTIONARY['vi'];
    const parts = path.split('.');
    let current = dict;
    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        return path;
      }
    }
    return current;
  }
}
