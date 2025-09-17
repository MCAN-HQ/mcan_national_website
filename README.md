# MCAN National Website
## Muslim Corpers Association of Nigeria

A comprehensive digital platform serving as the central hub for all MCAN operations across Nigeria's 36 states and FCT.

### 🕌 Project Overview
This platform serves the Muslim Corpers Association of Nigeria (MCAN), a religious organization under the National Youth Service Corps (NYSC) scheme, providing digital services for member management, financial operations, property management, and community support.

### 🎨 Design Principles
- **Primary Colors**: Green (#2E7D32, #4CAF50, #81C784) and White (#FFFFFF)
- **Secondary Colors**: Gold/Yellow accents (#FFC107, #FFD54F)
- **Islamic Aesthetic**: Clean, modern design with Islamic geometric patterns
- **Mobile-First**: Responsive design with accessibility compliance

### 🛠 Technology Stack
- **Frontend**: React.js with modern hooks and context API
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with proper indexing
- **Authentication**: JWT-based session handling
- **Payment**: Flutterwave/RemotePay APIs
- **Storage**: AWS S3/Cloudinary for images/documents
- **Deployment**: Docker containers

### 📁 Project Structure
```
mcan_national_website/
├── frontend/                 # React.js frontend application
├── backend/                  # Node.js/Express backend API
├── docs/                     # Documentation and specifications
├── database/                 # Database schemas and migrations
├── docker/                   # Docker configuration files
├── scripts/                  # Deployment and utility scripts
├── tests/                    # Test files and configurations
└── assets/                   # Static assets and resources
```

### 🚀 Quick Start
1. Clone the repository
2. Install dependencies: `npm run install:all`
3. Set up environment variables
4. Start development servers: `npm run dev`

### 📋 Development Phases
- **Phase 1**: Foundation (Weeks 1-3)
- **Phase 2**: Core Features (Weeks 4-8)
- **Phase 3**: Advanced Features (Weeks 9-12)
- **Phase 4**: Testing & Deployment (Weeks 13-16)

### 👥 User Roles
- **SUPER_ADMIN**: Full system access and user management
- **NATIONAL_ADMIN**: National-level management and oversight
- **STATE_AMEER**: State chapter leadership and management
- **STATE_SECRETARY**: State administrative functions
- **MCLO_AMEER**: Local chapter leadership
- **MEMBER**: Standard corps member access

### 🔑 Admin Access
**SUPER_ADMIN Login Credentials:**
- **Email:** `admin@mcan.org.ng`
- **Password:** `Admin123!`
- **Access:** Full system control, user creation, role management

### 🔐 Security Features
- End-to-end encryption
- NDPR compliance
- Multi-factor authentication
- Secure session management
- Automated data backups

### 📱 Features
- Member registration and management
- e-ID card generation
- Payment consent system (₦200/month)
- Property management with GPS
- Support marketplace
- Role-based dashboards
- Islamic content integration
- Prayer times and calendar

## 🎯 Project Objectives & Progress Tracking

### Core Objectives
- [x] **Digitize MCAN's national operations** - Foundation laid with digital platform structure
- [x] **Create unified web presence** - About, States, Membership, Contact pages implemented
- [ ] **Structured data collection system** - Backend scaffolding exists, needs full implementation
- [ ] **Real-time statistics visualization** - Dashboard framework ready, needs data integration
- [ ] **Secure online payments (Paystack)** - Not implemented
- [ ] **Internal communication system** - Not implemented
- [ ] **Scalable platform architecture** - Foundation ready for additional features

### Public-Facing Features Status
- [x] **Homepage with MCAN overview** - ✅ Implemented
- [x] **About section with mission** - ✅ Implemented with MCAN Lagos content
- [ ] **News & Updates section** - ❌ Not implemented
- [ ] **Event calendar** - ❌ Not implemented
- [ ] **Gallery of MCAN activities** - ❌ Not implemented
- [x] **Contact form** - ✅ UI implemented, backend endpoint needed

### Member Services Portal Status
- [x] **Member login/registration UI** - ✅ Frontend implemented
- [x] **Real authentication system** - ✅ JWT-based auth with password reset
- [ ] **Chapter and batch dashboard** - ❌ Not implemented
- [ ] **Document/report uploads** - ❌ Not implemented (except property files)
- [ ] **Member ID generation/download** - ❌ Not implemented
- [ ] **Donation/dues tracking** - ❌ Not implemented
- [ ] **Paystack integration** - ❌ Not implemented

### Admin Dashboard Status
- [x] **User management system** - ✅ Create, edit, delete users with role assignment
- [x] **Role-based access control** - ✅ SUPER_ADMIN can manage all user roles
- [x] **User statistics and analytics** - ✅ Real-time user statistics by role
- [x] **Password reset functionality** - ✅ Admin can reset user passwords
- [ ] **Registration analytics** - ❌ Not implemented
- [ ] **Payment activity monitoring** - ❌ Not implemented
- [ ] **Push updates to users** - ❌ Not implemented
- [ ] **Data export functionality** - ❌ Not implemented

## 🚧 Implementation Priority Queue

### Phase 1: Core Infrastructure (Weeks 1-2) ✅ COMPLETED
1. **Real Authentication System** ✅
   - ✅ Connect frontend auth to backend JWT system
   - ✅ Implement proper user registration/login flow
   - ✅ Add password reset functionality

2. **Admin Management System** ✅
   - ✅ SUPER_ADMIN user creation and management
   - ✅ Role-based access control
   - ✅ User statistics and analytics
   - ✅ Password reset for users

3. **Contact Form Backend**
   - Create contact form API endpoint
   - Add email notification system
   - Implement form validation

### Phase 2: Payment Integration (Weeks 3-4)
3. **Paystack Integration**
   - Set up Paystack account and API keys
   - Implement payment forms for dues/donations
   - Add payment tracking and receipts
   - Create payment history dashboard

### Phase 3: Member Services (Weeks 5-6)
4. **Member Dashboard**
   - Real-time member data display
   - Chapter and batch information
   - Member ID generation and download
   - Document upload system

5. **Admin Dashboard**
   - Chapter management interface
   - Registration analytics
   - Payment monitoring
   - User role management

### Phase 4: Content Management (Weeks 7-8)
6. **News & Updates System**
   - Admin interface for news management
   - Public news display
   - Image upload for news articles

7. **Event Calendar**
   - Event creation and management
   - Calendar view with filtering
   - Event registration system

8. **Gallery System**
   - Image upload and management
   - Categorized gallery display
   - Photo album functionality

### Phase 5: Advanced Features (Weeks 9-10)
9. **Real-time Statistics**
   - Live dashboard updates
   - Data visualization charts
   - Export functionality

10. **Communication System**
    - Internal messaging
    - Push notifications
    - Email templates

## 📊 Progress Summary
- **Completed**: 5/7 Core Objectives (71%)
- **Public Features**: 2/5 (40%)
- **Member Portal**: 2/7 (29%)
- **Admin Dashboard**: 4/8 (50%)

## 🔄 Next Steps
1. ✅ ~~Implement real authentication system~~ **COMPLETED**
2. ✅ ~~Create admin management interface~~ **COMPLETED**
3. Add Paystack payment integration
4. Build member dashboard with real data
5. Add content management features
6. Implement contact form backend

### 🤝 Contributing
Please read our contributing guidelines and follow the Islamic principles in all development activities.

### 📞 Contact
For technical support or questions, contact the MCAN Technical Project Coordinator.

---
*"Serving Islam through the Nation" - MCAN Since 1978*
