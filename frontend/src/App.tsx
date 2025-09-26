import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MembershipPage from './pages/MembershipPage';
import ServicesPage from './pages/ServicesPage';
import PropertyManagementPage from './pages/services/PropertyManagementPage';
import StatesPage from './pages/StatesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import PrayerTimesPage from './pages/PrayerTimesPage';
import NotFoundPage from './pages/NotFoundPage';
import EIDPage from './pages/dashboard/EIDPage';
import IslamicResourcesPage from './pages/IslamicResourcesPage';

// Protected Route Component
import ProtectedRoute from './components/auth/ProtectedRoute';

// Contexts
import { useAuth } from './contexts/AuthContext';
import { CustomThemeProvider } from './contexts/ThemeContext';

// PWA Components
import InstallPrompt from './components/pwa/InstallPrompt';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/properties" element={<PropertyManagementPage />} />
          <Route path="/states" element={<StatesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/prayer-times" element={<PrayerTimesPage />} />
          <Route path="/islamic-resources" element={<IslamicResourcesPage />} />
          
          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
          />
          <Route 
            path="/forgot-password" 
            element={user ? <Navigate to="/dashboard" replace /> : <ForgotPasswordPage />} 
          />
          <Route 
            path="/reset-password" 
            element={user ? <Navigate to="/dashboard" replace /> : <ResetPasswordPage />} 
          />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/eid" 
            element={
              <ProtectedRoute>
                <EIDPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      
      <Footer />
      <InstallPrompt />
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
};

export default App;
