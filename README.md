# 💒 Wedding Landing Page

> A modern, multilingual, mobile-first wedding landing page built with **Nuxt 3** for Madeline Fehleisen & Alexander Matte's wedding on June 6, 2026.

![Wedding Landing Page](https://img.shields.io/badge/Nuxt-3.16.2-00DC82?style=for-the-badge&logo=nuxt.js)
![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=for-the-badge&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎯 Project Overview

This is a comprehensive wedding landing page featuring:

- **📱 Mobile-first responsive design** with elegant wedding theme
- **🌐 Multi-language support** (English & German)
- **📊 RSVP system** with admin dashboard
- **🔒 Advanced security** with bot protection and validation
- **🏨 Accommodation guide** with hotel recommendations
- **📅 Wedding information** including schedule and activities
- **📧 Email notifications** and guest management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Cloudflare Turnstile account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Wedding-Landing-Page
   ```

2. **Navigate to the app directory**
   ```bash
   cd app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your environment variables (see detailed setup below)
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
Wedding-Landing-Page/
├── app/                    # Main Nuxt 3 application
│   ├── components/        # Vue components
│   ├── pages/            # Application pages
│   ├── server/           # API routes
│   ├── i18n/             # Internationalization
│   └── README.md         # Detailed documentation
├── LICENSE               # Project license
└── README.md            # This file (project overview)
```

## 🔧 Technology Stack

- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework with SSR/SSG
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Nuxt UI](https://ui.nuxt.com/)** - Component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
- **[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)** - Bot protection

## 📚 Documentation

### 📖 [Detailed Documentation](./app/README.md)
Complete setup guide, development instructions, and technical details.

### 🔍 [Project Index](./app/PROJECT_INDEX.md)
Comprehensive technical documentation including:
- Architecture overview
- Database schema
- Security features
- Performance optimizations
- Mobile responsiveness details

### 🔐 [Security Documentation](./app/SECURITY.md)
Detailed security implementation and best practices.

### 🚀 [Production Setup](./app/PRODUCTION_SETUP.md)
Deployment and production configuration guide.

## 🎨 Design Features

- **Custom wedding color palette** with elegant typography
- **Mobile-first responsive design** optimized for all devices
- **Smooth animations** and hover effects
- **Accessibility compliant** (WCAG standards)
- **Internationalization** with dynamic language switching

## 🔒 Security Features

- **Cloudflare Turnstile** bot protection
- **Zod schema validation** with type safety
- **Input sanitization** to prevent XSS attacks
- **CSRF protection** and secure headers
- **Rate limiting** on API endpoints

## 📱 Mobile Optimization

- **Touch-friendly interface** with 44px minimum touch targets
- **Responsive navigation** with collapsible mobile menu
- **Optimized forms** for mobile interaction
- **Fast loading** on all devices
- **Offline support** capabilities

## 🚀 Deployment

The application is designed for deployment on **Vercel** with:
- **Automatic deployments** from Git
- **Environment variable management**
- **Edge functions** for API routes
- **Global CDN** for fast loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Documentation**: Check the [detailed README](./app/README.md)
- **Issues**: Create an issue in the repository

## 🙏 Acknowledgments

- **Nuxt Team** for the amazing framework
- **Supabase** for the backend infrastructure
- **Cloudflare** for Turnstile bot protection
- **Tailwind CSS** for the utility-first styling approach

---

**Made with ❤️ for Madeline & Alexander's special day**

*June 6, 2026*