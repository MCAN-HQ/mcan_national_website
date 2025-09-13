import React from 'react';
import { Container, Typography } from '@mui/material';

const ServicesPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Our Services
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        MCAN provides comprehensive digital services for Muslim Corps Members.
      </Typography>
      <Typography variant="body1">
        More content coming soon...
      </Typography>
    </Container>
  );
};

export default ServicesPage;
