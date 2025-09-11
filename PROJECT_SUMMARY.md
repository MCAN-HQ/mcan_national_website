# MCAN National Website - Project Summary

## 🕌 Project Overview
The **Muslim Corpers Association of Nigeria (MCAN) National Website** is a comprehensive digital platform serving as the central hub for all MCAN operations across Nigeria's 36 states and FCT. This platform provides digital services for member management, financial operations, property management, and community support for Muslim National Youth Service Corps members.

## 🎯 Project Status
**Current Phase**: Foundation Complete ✅
- ✅ Project structure established
- ✅ Frontend foundation with React/TypeScript
- ✅ Backend foundation with Node.js/Express
- ✅ Database schema designed
- ✅ Docker configuration ready
- ✅ Documentation created

## 🏗️ Architecture Overview

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) with custom Islamic theme
- **State Management**: React Context API + React Query
- **Routing**: React Router DOM
- **Styling**: Custom CSS with Islamic geometric patterns
- **Authentication**: JWT-based with role-based access control

### Backend (Node.js + Express)
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js with comprehensive middleware
- **Database**: PostgreSQL with Knex.js ORM
- **Caching**: Redis for session management and caching
- **Authentication**: JWT with refresh token support
- **Documentation**: Swagger/OpenAPI integration

### Database (PostgreSQL)
- **Users & Authentication**: Complete user management system
- **Members**: Corps member registration and management
- **Payments**: Payment consent and transaction tracking
- **Properties**: Property management with GPS integration
- **Marketplace**: E-commerce functionality
- **Notifications**: Real-time notification system

## 🎨 Design System

### Color Palette
- **Primary**: Green (#2E7D32, #4CAF50, #81C784)
- **Secondary**: Gold/Yellow (#FFC107, #FFD54F)
- **Background**: Clean white with subtle Islamic patterns
- **Text**: Dark green (#1B5E20) for headings, charcoal gray (#424242) for body

### Islamic Aesthetic
- Subtle geometric patterns as background elements
- Crescent moon and star motifs
- Mosque silhouettes in hero sections
- Arabic font support (Amiri) for Islamic content
- Prayer time integration

## 🔐 User Roles & Permissions

### Role Hierarchy
1. **SUPER_ADMIN**: Full system access
2. **NATIONAL_ADMIN**: National-level management
3. **STATE_AMEER**: State chapter leadership
4. **STATE_SECRETARY**: State administrative functions
5. **MCLO_AMEER**: Local chapter leadership
6. **MEMBER**: Standard corps member access

### Permission Matrix
- **Member Management**: All roles can view, admins can modify
- **Payment Processing**: State+ roles can manage
- **Property Management**: State+ roles can manage
- **System Configuration**: Super admin only

## 🚀 Key Features Implemented

### ✅ Completed Features
1. **Project Structure**: Complete monorepo setup
2. **Frontend Foundation**: React app with Islamic theme
3. **Backend Foundation**: Express API with middleware
4. **Database Schema**: Comprehensive PostgreSQL schema
5. **Authentication System**: JWT-based with role management
6. **API Documentation**: Swagger/OpenAPI integration
7. **Docker Configuration**: Multi-container setup
8. **Documentation**: API docs and deployment guide

### 🔄 In Progress Features
1. **Database Implementation**: Schema deployment and seeding
2. **Authentication Logic**: Complete auth flow implementation
3. **Payment Integration**: Flutterwave gateway integration
4. **e-ID System**: Digital ID card generation
5. **Dashboard Implementation**: Role-based dashboards

### 📋 Planned Features
1. **Property Management**: GPS integration and photo galleries
2. **Marketplace Platform**: E-commerce for support items
3. **Islamic Content**: Prayer times and Islamic calendar
4. **Mobile App**: React Native companion app
5. **Analytics**: Advanced reporting and analytics

## 🛠️ Technology Stack

### Frontend Technologies
- React 18.2.0
- TypeScript 4.9.5
- Material-UI 5.15.0
- React Router DOM 6.20.1
- React Query 3.39.3
- Framer Motion 10.16.16
- React Hook Form 7.48.2
- React Hot Toast 2.4.1

### Backend Technologies
- Node.js 18+
- Express.js 4.18.2
- TypeScript 5.3.3
- PostgreSQL 15
- Redis 7
- Knex.js 3.0.1
- JWT 9.0.2
- Bcryptjs 2.4.3
- Joi 17.11.0

### DevOps & Infrastructure
- Docker & Docker Compose
- Nginx (reverse proxy)
- GitHub Actions (CI/CD)
- AWS S3 / Cloudinary (file storage)
- Flutterwave (payment processing)
- Twilio (SMS notifications)

## 📁 Project Structure
```
mcan_national_website/
├── frontend/                 # React.js frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   ├── services/       # API service functions
│   │   ├── contexts/       # React contexts
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js/Express backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── config/         # Configuration files
│   └── package.json        # Backend dependencies
├── database/               # Database schemas and migrations
│   └── schema.sql         # Complete database schema
├── docs/                  # Documentation
│   ├── API_DOCUMENTATION.md
│   └── DEPLOYMENT_GUIDE.md
├── docker/                # Docker configuration
├── scripts/               # Deployment and utility scripts
├── tests/                 # Test files and configurations
├── assets/                # Static assets and resources
├── docker-compose.yml     # Multi-container setup
├── package.json          # Root package.json
└── README.md             # Project documentation
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Quick Start
```bash
# Clone repository
git clone https://github.com/mcan-nigeria/mcan-national-website.git
cd mcan_national_website

# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Or use Docker
docker-compose up -d
```

### Environment Configuration
```bash
# Copy environment files
cp backend/env.example backend/.env
cp frontend/.env.example frontend/.env

# Configure environment variables
# See docs/DEPLOYMENT_GUIDE.md for details
```

## 📊 Database Schema Highlights

### Core Tables
- **users**: User accounts and authentication
- **members**: Corps member information
- **eid_cards**: Digital ID cards with QR codes
- **payments**: Payment transactions and consents
- **properties**: MCAN properties with GPS coordinates
- **products**: Marketplace items
- **orders**: E-commerce orders
- **notifications**: Real-time notifications

### Key Features
- UUID primary keys for security
- Comprehensive indexing for performance
- Audit logging for compliance
- Soft deletes for data integrity
- JSONB fields for flexible data storage

## 🚀 Deployment Strategy

### Development Environment
- Local development with hot reload
- Docker Compose for service orchestration
- PostgreSQL and Redis containers
- Nginx reverse proxy

### Production Environment
- Docker containers on cloud infrastructure
- Load balancer for high availability
- SSL/TLS encryption
- Automated backups
- Monitoring and logging

## 📈 Performance Considerations

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Progressive Web App (PWA) capabilities
- Service worker for offline functionality

### Backend Optimization
- Database query optimization
- Redis caching strategy
- Rate limiting and security
- Connection pooling

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Session management with Redis

### Data Protection
- NDPR compliance
- Data encryption at rest and in transit
- Audit logging
- Input validation and sanitization

### Infrastructure Security
- HTTPS enforcement
- CORS configuration
- Rate limiting
- Security headers

## 📱 Mobile Responsiveness

### Design Approach
- Mobile-first responsive design
- Touch-friendly interface elements
- Optimized for iOS and Android browsers
- Progressive Web App features

### Breakpoints
- Mobile: 0-600px
- Tablet: 600-900px
- Desktop: 900px+

## 🌍 Internationalization

### Language Support
- English (primary)
- Arabic (Islamic content)
- Hausa (future expansion)

### Cultural Considerations
- Islamic calendar integration
- Prayer time calculations
- Halal compliance indicators
- Cultural sensitivity in design

## 📞 Support & Maintenance

### Technical Support
- Email: tech@mcan.org.ng
- Documentation: https://docs.mcan.org.ng
- API Documentation: https://api.mcan.org.ng/api-docs

### Maintenance Schedule
- Daily automated backups
- Weekly security updates
- Monthly performance reviews
- Quarterly feature releases

## 🎯 Next Steps

### Immediate Priorities (Sprint 1-2)
1. Complete database implementation
2. Implement authentication system
3. Build core member management features
4. Integrate payment gateway

### Medium-term Goals (Sprint 3-4)
1. Complete e-ID card system
2. Implement property management
3. Build marketplace platform
4. Create role-based dashboards

### Long-term Vision
1. Mobile application development
2. Advanced analytics and reporting
3. AI-powered features
4. Integration with NYSC systems

---

**Project Status**: Foundation Complete ✅  
**Next Milestone**: Database Implementation & Authentication System  
**Estimated Completion**: 8-12 weeks (following Scrum methodology)  
**Team**: MCAN Technical Development Team  
**Contact**: Taofeek Akintunde (Technical Project Coordinator)
