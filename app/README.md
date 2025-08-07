# 💒 Wedding Landing Page

A modern, multilingual, mobile-first wedding landing page built with **Nuxt 3** for Madeline Fehleisen & Alexander Matte's wedding on June 6, 2026. Features RSVP functionality, admin dashboard, comprehensive wedding information, and enhanced security measures.

![Wedding Landing Page](https://img.shields.io/badge/Nuxt-3.16.2-00DC82?style=for-the-badge&logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Beautiful Design**
- **Mobile-first responsive design** with elegant wedding theme
- **Custom color palette** with wedding-inspired colors
- **Typography**: Playfair Display for headings, Inter for body text
- **Smooth animations** and hover effects
- **Accessibility compliant** (WCAG standards)

### 🌐 **Internationalization**
- **Multi-language support**: English and German
- **Dynamic language switching** with persistent preferences
- **Localized content** for all wedding information

### 📱 **Mobile-Optimized**
- **Touch-friendly interface** with 44px minimum touch targets
- **Responsive navigation** with collapsible mobile menu
- **Optimized forms** for mobile interaction
- **Fast loading** on all devices

### 🔒 **Security & Validation**
- **Cloudflare Turnstile** bot protection
- **Zod schema validation** with type safety
- **Input sanitization** to prevent XSS attacks
- **CSRF protection** and secure headers
- **Rate limiting** on API endpoints

### 📊 **RSVP System**
- **Advanced form validation** with real-time feedback
- **Guest management** for additional attendees
- **Database storage** with Supabase PostgreSQL
- **Email notifications** for RSVP submissions
- **Admin dashboard** for RSVP management

### 🏨 **Accommodation Guide**
- **Hotel recommendations** with photos and details
- **Transportation information** with interactive elements
- **Mobile-optimized** hotel selection interface

### 📅 **Wedding Information**
- **Event details** with venue information
- **Schedule timeline** with mobile-friendly layout
- **Local activities** guide for guests
- **Registry information** with elegant presentation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account
- Cloudflare Turnstile account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wedding-Landing-Page/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your environment variables:
   ```env
   NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NUXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
   NUXT_TURNSTILE_SECRET_KEY=your_turnstile_secret_key
   ADMIN_EMAIL=your_admin_email
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Project Structure

```
app/
├── assets/                 # Static assets (CSS, images, icons)
├── components/            # Vue components
│   ├── Accommodations.vue # Hotel recommendations
│   ├── Hero.vue          # Landing hero section
│   ├── RSVP.vue          # RSVP form component
│   └── ...               # Other components
├── i18n/                 # Internationalization
│   └── locales/          # Translation files
├── middleware/           # Route middleware
├── pages/               # Application pages
│   ├── admin/           # Admin dashboard
│   └── ...              # Other pages
├── server/              # Server-side API routes
└── public/              # Public static files
```

### Key Technologies

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework with SSR/SSG
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Nuxt UI](https://ui.nuxt.com/)** - Component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
- **[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)** - Bot protection

## 🎨 Design System

### Color Palette
- **Wedding White**: `#FAF9F6` - Primary background
- **Wedding Pink**: `#f0d7d1` - Primary brand color
- **Wedding Green**: `#a3b18a` - Accent color
- **Wedding Gold**: `#d4af37` - Highlight color
- **Wedding Sage**: `#9ca3af` - Muted text

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)
- **Responsive**: Fluid typography with clamp()

## 🔒 Security Features

- **Bot Protection**: Cloudflare Turnstile integration
- **Input Validation**: Zod schema validation
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Secure headers and tokens
- **Rate Limiting**: API endpoint protection
- **HTTPS Only**: Secure data transmission

## 📊 Database Schema

### RSVP Table
```sql
- id (UUID, primary key)
- name (text) - Main guest name
- email (text) - Contact email
- attending (boolean) - Attendance status
- message (text) - Optional message
- guests (jsonb) - Additional guest information
- song (text) - Dance floor song request
- created_at (timestamp) - Submission timestamp
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on git push

### Environment Variables

```env
# Supabase Configuration
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare Turnstile
NUXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
NUXT_TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Admin Configuration
ADMIN_EMAIL=your_admin_email
```

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Mobile Features
- Touch-friendly interface (44px minimum targets)
- Swipe navigation
- Optimized images and assets
- Fast loading performance
- Offline support capabilities

## 🧪 Testing

### Code Quality
- **ESLint**: Code quality and style enforcement
- **TypeScript**: Type safety and IntelliSense
- **Form Validation**: Client and server-side validation

### Manual Testing
- Cross-browser compatibility
- Mobile device testing
- Accessibility testing (WCAG compliance)
- Performance testing

## 📈 Performance

### Optimizations
- **Image Optimization**: Nuxt Image module
- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Components and images
- **Caching**: Vercel edge caching
- **Minification**: Production build optimization

### Core Web Vitals
- **LCP**: Optimized for fast loading
- **FID**: Smooth interactions
- **CLS**: Stable layout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: [Your contact email]
- **Documentation**: Check the [PROJECT_INDEX.md](./PROJECT_INDEX.md) for detailed technical information
- **Issues**: Create an issue in the repository

## 🙏 Acknowledgments

- **Nuxt Team** for the amazing framework
- **Supabase** for the backend infrastructure
- **Cloudflare** for Turnstile bot protection
- **Tailwind CSS** for the utility-first styling approach

---

**Made with ❤️ for Madeline & Alexander's special day**

*June 6, 2026*
