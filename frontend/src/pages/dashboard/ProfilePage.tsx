import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  Divider,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import { Person, Email, Phone, LocationOn, Work, School, Save, Edit } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  stateCode: string;
  deploymentState: string;
  serviceYear: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      stateCode: user?.stateCode || '',
      deploymentState: user?.deploymentState || '',
      serviceYear: user?.serviceYear || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement profile update API call
      console.log('Profile update data:', data);
      
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
      setIsEditing(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'error';
      case 'NATIONAL_ADMIN': return 'warning';
      case 'STATE_AMEER': return 'primary';
      case 'STATE_SECRETARY': return 'secondary';
      case 'MCLO_AMEER': return 'info';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Profile Management
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {user?.fullName?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
              {user?.fullName || 'User'}
            </Typography>
            <Chip
              label={user?.role?.replace('_', ' ') || 'Member'}
              color={getRoleColor(user?.role || 'MEMBER')}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">
                Personal Information
              </Typography>
              {!isEditing ? (
                <Button
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  variant="outlined"
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    startIcon={<Save />}
                    variant="contained"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register('fullName', { required: 'Full name is required' })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format'
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...register('phone', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State Code"
                    {...register('stateCode')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Deployment State"
                    {...register('deploymentState')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <Work sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Service Year"
                    {...register('serviceYear')}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <School sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
