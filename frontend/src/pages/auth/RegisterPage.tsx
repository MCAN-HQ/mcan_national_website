import React from 'react';
import { Container, Typography } from '@mui/material';

const RegisterPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Join MCAN
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Register to become a member of the Muslim Corpers Association of Nigeria.
      </Typography>
      <Typography variant="body1">
        Registration form coming soon...
      </Typography>
    </Container>
  );
};

export default RegisterPage;
