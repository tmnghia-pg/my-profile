# Trần Minh Nghĩa - Senior .NET Developer Static CV & Portfolio

Website CV & Portfolio cá nhân dạng tĩnh (Static Web), định hướng ứng tuyển **Senior .NET Developer** tại thị trường Việt Nam theo đúng đặc tả và kế hoạch trong [my-profile-plan.md](my-profile-plan.md).

---

## 🌟 Tính năng nổi bật

1. **Kiến trúc thuần Static (No Framework / Zero Build):**
   - HTML5, CSS3 hiện đại, Vanilla JavaScript với chuẩn ES Modules.
   - Nguồn dữ liệu thuần JSON độc lập (`data/`), không hardcode thông tin cá nhân trong HTML hay JavaScript.
2. **2 Chế độ hiển thị linh hoạt (Dual View):**
   - **Portfolio View:** Giao diện website hiện đại, trực quan, giới thiệu năng lực kỹ thuật, timeline kinh nghiệm, card dự án có tag công nghệ và số liệu nổi bật.
   - **Resume View (CV Chuẩn A4):** Bố cục CV chuyên nghiệp, cô đọng chuẩn 1–2 trang A4, tối ưu sẵn sàng xuất PDF hoặc gửi nhà tuyển dụng.
3. **Đa biến thể mục tiêu (Multi-Profile):**
   - `.NET Backend Developer` (Mục tiêu chính).
   - `Full-stack Developer` (.NET / Vue 3 / Next.js).
   - Tự động thay đổi thứ tự nhóm kỹ năng, danh mục dự án tiêu biểu và phần tóm tắt phù hợp theo profile.
4. **Song ngữ hoàn chỉnh (Bilingual VI / EN):**
   - Chuyển đổi mượt mà giữa tiếng Việt và tiếng Anh mà không cần nhân bản dữ liệu.
5. **Đa giao diện (Theme Switching):**
   - `Minimal Light`: Tối giản, tinh tế, trang nhã.
   - `Dark Developer`: Hiện đại, phong cách lập trình viên cao cấp.
6. **In & Xuất PDF trực tiếp (Print-Ready):**
   - Tích hợp nút **In / Tải PDF** qua `window.print()`.
   - File `print.css` tự động ẩn toolbar/nav, chuyển sang định dạng A4 sạch sẽ, không vỡ trang hay lỗi font tiếng Việt.
7. **URL Query State phản ánh trạng thái:**
   - Hỗ trợ chia sẻ trực tiếp link theo cấu hình, ví dụ:
     - `/?profile=dotnet-backend`
     - `/?profile=fullstack&lang=en&theme=dark`
     - `/?view=resume&profile=dotnet-backend&lang=vi`

---

## 🎯 Chiến lược CV & Trọng tâm định vị

| Vị trí trong CV | Nội dung nên nhấn mạnh |
| :--- | :--- |
| **Professional Summary** | Năng lực phát triển sản phẩm, .NET, AI Engineering |
| **Technical Highlights** | SnapFox, TORVEN, Mentorship, Team Leadership |
| **MISA Experience** | Custom Reporting Engine, performance, security, Advisor |
| **Personal Projects** | Chi tiết SnapFox và TORVEN |

---

## 🚀 Cách chạy tại Local

Do trình duyệt chặn đọc file JSON qua giao thức `file://` (CORS security), cần chạy website qua một local web server:

### Cách 1: Sử dụng Node.js có sẵn (Khuyến nghị)
```bash
# Sử dụng script tích hợp không cần cài thêm thư viện
npm start
# hoặc
node server.js
```
Sau đó truy cập: [http://localhost:3000](http://localhost:3000)

### Cách 2: Sử dụng VS Code Live Server
- Mở thư mục dự án trong VS Code.
- Nhấp chuột phải vào `index.html` chọn **Open with Live Server**.

---

## 📂 Cấu trúc thư mục

```text
my-profile/
├── index.html                   # Trang chủ static & thẻ SEO
├── server.js                    # Web server local thuần Node.js
├── package.json                 # Cấu hình script npm start
├── my-profile-plan.md           # Kế hoạch & dữ liệu gốc
├── README.md                    # Hướng dẫn sử dụng & vận hành
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deploy tự động lên Pages
├── data/
│   ├── profile.json             # Thông tin cá nhân, liên hệ, tóm tắt
│   ├── experiences.json         # Lịch sử công tác & đóng góp tại MISA
│   ├── projects.json            # Chi tiết các dự án (BUMAS, LEKIMA, Panda, SnapFox, TORVEN...)
│   ├── skills.json              # Danh mục kỹ năng theo nhóm
│   ├── education.json           # Học vấn (ĐH GTVT - Kỹ sư Giỏi)
│   ├── certificates.json        # Chứng chỉ (Tiếng Anh B1, Cán bộ nguồn)
│   └── config/
│       ├── profiles.json        # Cấu hình profile .NET Backend / Full-stack
│       ├── themes.json          # Cấu hình theme Minimal / Dark
│       └── site.json            # Cấu hình metadata, ngôn ngữ mặc định
└── assets/
    ├── css/
    │   ├── base.css             # Tokens, reset, typography
    │   ├── layout.css           # Cấu trúc layout, header, hero, timeline
    │   ├── components.css       # Cards, tags, floating toolbar, resume layout
    │   ├── responsive.css       # Responsive tablet & mobile
    │   ├── print.css            # Định dạng A4 chuyên biệt cho in ấn / PDF
    │   └── themes/
    │       ├── minimal.css      # Biến giao diện sáng Minimal
    │       └── dark.css         # Biến giao diện tối Dark Developer
    └── js/
        ├── app.js               # Điểm khởi tạo và điều phối chính
        ├── router.js            # Quản lý query parameter và URL
        ├── state.js             # Quản lý state reactive (lang, theme, profile, view)
        ├── data-service.js      # Nạp và validate dữ liệu JSON
        ├── profile-service.js   # Lọc dữ liệu theo profile
        ├── theme-service.js     # Đổi theme
        ├── language-service.js  # Xử lý song ngữ VI/EN
        ├── view-service.js      # Chuyển đổi Portfolio / Resume view
        ├── export-service.js    # Điều khiển in / xuất PDF
        ├── utils/
        │   └── toast.js         # Thông báo sao chép clipboard
        └── components/          # Các thành phần giao diện động
```

---

## 🌐 Hướng dẫn Deploy lên GitHub Pages

1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: initial static web cv"
   git branch -M main
   git remote add origin <URL-REPO-CUA-BAN>
   git push -u origin main
   ```
2. Vào **Settings** của repository trên GitHub -> **Pages**:
   - Tại mục **Build and deployment > Source**, chọn **GitHub Actions**.
   - GitHub Actions sẽ tự động kích hoạt file [.github/workflows/deploy.yml](.github/workflows/deploy.yml) để đưa trang web lên online sau 1–2 phút.
3. Website sẽ có sẵn tại địa chỉ: `https://<username>.github.io/<repo-name>/`.
