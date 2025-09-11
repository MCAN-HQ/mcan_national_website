import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const MembershipPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Membership
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Join the Muslim Corpers Association of Nigeria and be part of our community.
      </Typography>
      <Typography variant="body1">
        More content coming soon...
      </Typography>
    </Container>
  );
};

export default MembershipPage;
