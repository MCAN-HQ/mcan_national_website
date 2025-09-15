import React from 'react';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box } from '@mui/material';
import { Business, HomeWork, DirectionsBus, Mosque } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', color: 'primary.dark' }}>
        Our Services
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        MCAN provides comprehensive digital services for Muslim Corps Members.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={3}>
            <CardActionArea onClick={() => navigate('/services/properties')}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Business color="primary" />
                  <Typography variant="h5" fontWeight="bold">Property Management</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Manage MCAN properties by state: lodges, buses, masjids and more.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <HomeWork color="action" />
                <Typography variant="h6">Lodges</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">State-managed accommodation facilities.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <DirectionsBus color="action" />
                <Typography variant="h6">Buses</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">Transport assets assigned to states.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={1}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Mosque color="action" />
                <Typography variant="h6">Masjids</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">Prayer spaces overseen by MCAN.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicesPage;
