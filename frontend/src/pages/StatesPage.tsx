import React from 'react';
import { Container, Typography } from '@mui/material';

const StatesPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        State Chapters
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        MCAN operates across all 36 states and the Federal Capital Territory.
      </Typography>
      <Typography variant="body1">
        More content coming soon...
      </Typography>
    </Container>
  );
};

export default StatesPage;
