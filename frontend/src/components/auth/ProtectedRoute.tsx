import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole, 
  allowedRoles 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Verifying authentication...
        </Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          gap: 2,
          p: 3,
        }}
      >
        <Typography variant="h5" color="error" textAlign="center">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          You don't have permission to access this page.
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Required role: {requiredRole.replace('_', ' ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Your role: {user.role.replace('_', ' ')}
        </Typography>
      </Box>
    );
  }

  // Check if user role is in allowed roles list
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          gap: 2,
          p: 3,
        }}
      >
        <Typography variant="h5" color="error" textAlign="center">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          You don't have permission to access this page.
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Allowed roles: {allowedRoles.map(role => role.replace('_', ' ')).join(', ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Your role: {user.role.replace('_', ' ')}
        </Typography>
      </Box>
    );
  }

  // Check if user account is active (default to true if not specified)
  if (user.isActive === false) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          gap: 2,
          p: 3,
        }}
      >
        <Typography variant="h5" color="warning.main" textAlign="center">
          Account Inactive
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          Your account has been deactivated. Please contact support for assistance.
        </Typography>
      </Box>
    );
  }

  // All checks passed, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
