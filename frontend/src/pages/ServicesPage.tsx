import React from 'react';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box, Chip, Button } from '@mui/material';
import { Business, HomeWork, DirectionsBus, Mosque, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const services = [
    {
      id: 'properties',
      title: 'Property Management',
      description: 'Manage MCAN properties by state: lodges, buses, masjids and more.',
      icon: <Business color="primary" />,
      route: '/services/properties',
      available: true,
      color: 'primary'
    },
    {
      id: 'lodges',
      title: 'Lodges',
      description: 'State-managed accommodation facilities for corps members.',
      icon: <HomeWork color="secondary" />,
      route: '/services/properties?type=LODGE',
      available: true,
      color: 'secondary'
    },
    {
      id: 'buses',
      title: 'Transportation',
      description: 'Transport assets and logistics management for state chapters.',
      icon: <DirectionsBus color="success" />,
      route: '/services/properties?type=BUS',
      available: true,
      color: 'success'
    },
    {
      id: 'masjids',
      title: 'Masjids',
      description: 'Prayer spaces and Islamic centers overseen by MCAN.',
      icon: <Mosque color="info" />,
      route: '/services/properties?type=MASJID',
      available: true,
      color: 'info'
    },
    {
      id: 'membership',
      title: 'Membership',
      description: 'Join MCAN and access exclusive member benefits and services.',
      icon: <Business color="warning" />,
      route: user ? '/dashboard' : '/register',
      available: true,
      color: 'warning'
    },
    {
      id: 'events',
      title: 'Events & Programs',
      description: 'Stay updated with MCAN events, workshops, and community programs.',
      icon: <Business color="error" />,
      route: '/events',
      available: false,
      color: 'error'
    }
  ];

  const handleServiceClick = (service: typeof services[0]) => {
    if (service.available) {
      navigate(service.route);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip label="Services" color="primary" sx={{ fontWeight: 700, mb: 2 }} />
        <Typography variant="h2" sx={{ mb: 2, color: 'primary.dark', fontWeight: 900 }}>
          Our Services
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          MCAN provides comprehensive digital services for Muslim Corps Members across Nigeria.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} md={6} lg={4} key={service.id}>
            <Card 
              elevation={service.available ? 3 : 1} 
              sx={{ 
                height: '100%',
                opacity: service.available ? 1 : 0.6,
                transition: 'all 0.3s ease',
                '&:hover': service.available ? {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                } : {}
              }}
            >
              <CardActionArea 
                onClick={() => handleServiceClick(service)}
                disabled={!service.available}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {service.icon}
                    <Typography variant="h5" fontWeight="bold" color={service.available ? 'text.primary' : 'text.disabled'}>
                      {service.title}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color={service.available ? 'text.secondary' : 'text.disabled'}
                    sx={{ mb: 3, flexGrow: 1 }}
                  >
                    {service.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {service.available ? (
                      <>
                        <Chip 
                          label="Available" 
                          color="success" 
                          size="small" 
                          sx={{ fontWeight: 600 }}
                        />
                        <ArrowForward color="primary" />
                      </>
                    ) : (
                      <Chip 
                        label="Coming Soon" 
                        color="default" 
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          Need help or have questions about our services?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/contact')}
          sx={{ px: 4, py: 1.5 }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default ServicesPage;
