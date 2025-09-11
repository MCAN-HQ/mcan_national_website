import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        About MCAN
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The Muslim Corpers Association of Nigeria (MCAN) is a religious organization under the National Youth Service Corps (NYSC) scheme.
      </Typography>
      <Typography variant="body1">
        More content coming soon...
      </Typography>
    </Container>
  );
};

export default AboutPage;
