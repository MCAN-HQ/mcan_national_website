import React from 'react';
import { Container } from '@mui/material';
import IslamicResources from '../components/islamic/IslamicResources';

const IslamicResourcesPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IslamicResources />
    </Container>
  );
};

export default IslamicResourcesPage;
