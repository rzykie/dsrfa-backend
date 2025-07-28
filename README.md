# DSRFA Web Application

The official web application for the **Davao-South Regional Football Association (DSRFA)** - a comprehensive platform for member management, event organization, and community engagement.

## 🏆 Features

### Core Functionality
- **Member Management**: Registration, profile management, and membership renewals
- **Event Management**: Create, manage, and track football events and tournaments
- **Dashboard Systems**: Separate dashboards for members and administrators
- **Authentication**: Secure login system with role-based access control
- **Photo Gallery**: Community photo sharing and event documentation
- **Accounting System**: Financial tracking and membership fee management

### User Roles
- **Players**: Basic membership with event access
- **Coaches**: Enhanced features for team management
- **Referees**: Specialized access for match officiating
- **Volunteers**: Community engagement features
- **Administrators**: Full system management capabilities

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dsrfa/web-application.git
cd dsrfa-web-application
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Accounts

**Member Account:**
- Email: `member@dsrfa.com`
- Password: `member123`

**Admin Account:**
- Email: `admin@dsrfa.com`
- Password: `admin123`

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.6.3** - Type-safe development environment
- **Vite 6.0.1** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS v4.0.0-beta.7** - Utility-first CSS framework
- **ShadCN UI** - High-quality component library with Radix primitives
- **Lucide React** - Beautiful SVG icon library
- **Framer Motion** - Animation and transition library

### Key Libraries
- **React Hook Form 7.55.0** - Form management and validation
- **Recharts** - Data visualization and charts
- **Sonner 2.0.3** - Toast notifications
- **React DnD** - Drag and drop functionality
- **Date-fns** - Date manipulation utilities

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Vitest** - Testing framework
- **TypeScript** - Static type checking

## 📁 Project Structure

```
dsrfa-web-application/
├── components/                 # React components
│   ├── ui/                    # ShadCN UI components
│   ├── figma/                 # Figma-specific components
│   ├── Dashboard.tsx          # Member dashboard
│   ├── AdminDashboard.tsx     # Admin dashboard
│   ├── EventsPage.tsx         # Events management
│   ├── LoginPage.tsx          # Authentication
│   └── ...                    # Other page components
├── styles/
│   └── globals.css            # Global styles and Tailwind config
├── App.tsx                    # Main application component
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#38A169` - Main brand color for DSRFA
- **Secondary Red**: `#E53E3E` - Accent color for important actions
- **Earth Tones**: Complementary colors for natural football aesthetic

### Typography
- **Base Font Size**: 15.4px (enhanced for elderly accessibility)
- **Font Weights**: 400 (normal), 500 (medium)
- **Line Height**: 1.5 for optimal readability

### Accessibility Features
- Enhanced font sizes for elderly users
- Increased button and input heights (12-15% larger)
- Minimum 3px border radius on all elements
- Color contrast compliance
- Keyboard navigation support

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # TypeScript type checking
```

### Testing
```bash
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Maintenance
```bash
npm run clean        # Clean build artifacts
```

## 🔐 Authentication

The application uses a mock authentication system with localStorage for session management. In production, this should be replaced with a secure backend authentication system.

### Login Process
1. User selects Member or Admin login type
2. Enters credentials or uses Quick Login feature
3. System validates against mock user database
4. Session stored in localStorage
5. User redirected to appropriate dashboard

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature access with optimal layout
- **Tablet**: Adapted layouts for medium screens
- **Mobile**: Touch-friendly interface with stacked layouts

## 🌟 Key Features

### Member Dashboard
- Membership status and renewal tracking
- Upcoming events and registration
- Community announcements
- Sponsor information and partnerships

### Admin Dashboard
- Member management and approval
- Event creation and management
- Financial tracking and accounting
- System statistics and analytics

### Event System
- Tournament creation and management
- Registration and participant tracking
- Event categories and filtering
- Photo gallery integration

## 🔄 Version History

Current Version: **V1.1.12**

The application includes a comprehensive version tracking system accessible via the footer. Major versions (V1.x.0) introduce new pages or significant features, while minor versions (V1.0.x) include styling updates and small improvements.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use provided ESLint and Prettier configurations
- Maintain existing design system patterns
- Add appropriate documentation for new features
- Include tests for new functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@dsrfa.com
- **Website**: https://dsrfa.com
- **Issues**: [GitHub Issues](https://github.com/dsrfa/web-application/issues)

## 🏅 Acknowledgments

- **DSRFA Community** - For requirements and feedback
- **ShadCN** - For the excellent UI component library
- **Lucide** - For the beautiful icon set
- **Tailwind CSS Team** - For the utility-first CSS framework

---

**Built with ❤️ for the Davao-South Regional Football Association**