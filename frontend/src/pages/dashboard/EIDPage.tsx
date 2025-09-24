import React from 'react';
import { Container, Box, Typography, Grid, Card } from '@mui/material';
import EIDCard from '../../components/dashboard/EIDCard';

const EIDPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
          Digital e-ID Card
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and download your MCAN digital identity card.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EIDCard />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Notes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your e-ID is linked to your membership profile. If details are incorrect, update your profile and regenerate your card from the dashboard.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EIDPage;


