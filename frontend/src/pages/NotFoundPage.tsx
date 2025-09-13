import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, color: 'primary.dark' }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<Home />}
        onClick={() => navigate('/')}
        sx={{ px: 4, py: 1.5 }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
