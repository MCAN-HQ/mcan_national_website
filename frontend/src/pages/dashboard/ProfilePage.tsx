import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Profile
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Manage your MCAN profile and account settings.
      </Typography>
      <Typography variant="body1">
        Profile management coming soon...
      </Typography>
    </Container>
  );
};

export default ProfilePage;
