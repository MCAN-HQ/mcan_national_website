import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PrayerTimes from '../components/prayer/PrayerTimes';

const PrayerTimesPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 2, color: 'primary.dark', fontWeight: 'bold' }}>
          Prayer Times
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Stay connected with your daily prayers
        </Typography>
      </Box>
      
      <PrayerTimes />
    </Container>
  );
};

export default PrayerTimesPage;
