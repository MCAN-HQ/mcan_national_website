import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Get in touch with MCAN for support and information.
      </Typography>
      <Typography variant="body1">
        More content coming soon...
      </Typography>
    </Container>
  );
};

export default ContactPage;
