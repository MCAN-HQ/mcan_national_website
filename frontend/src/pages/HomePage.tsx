import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  People,
  Business,
  LocationOn,
  Star,
  TrendingUp,
  Security,
  Support,
  School,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import mcanLogo from '../assets/mcanlogo.jpg';

const HomePage: React.FC = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Members', value: '15,000+', icon: <People />, color: '#4CAF50' },
    { label: 'State Chapters', value: '37', icon: <LocationOn />, color: '#2196F3' },
    { label: 'Years of Service', value: '45+', icon: <Star />, color: '#FF9800' },
    { label: 'Properties Managed', value: '200+', icon: <Business />, color: '#9C27B0' },
  ];

  const features = [
    {
      title: 'Digital e-ID Cards',
      description: 'Generate and manage your MCAN digital identity card with QR code verification.',
      icon: <Security />,
      color: '#4CAF50',
    },
    {
      title: 'Payment Management',
      description: 'Consent-based monthly deduction system with transparent financial tracking.',
      icon: <TrendingUp />,
      color: '#2196F3',
    },
    {
      title: 'Property Management',
      description: 'Comprehensive property documentation and management across all state chapters.',
      icon: <Business />,
      color: '#FF9800',
    },
    {
      title: 'Support Marketplace',
      description: 'Access essential items and services through our integrated marketplace platform.',
      icon: <Support />,
      color: '#9C27B0',
    },
    {
      title: 'Islamic Resources',
      description: 'Access to Islamic education, prayer times, and community resources.',
      icon: <School />,
      color: '#E91E63' },
    {
      title: 'State Coordination',
      description: 'Seamless coordination between national, state, and local chapter leadership.',
      icon: <LocationOn />,
      color: '#607D8B',
    },
  ];

  const testimonials = [
    {
      name: 'Aisha Ibrahim',
      role: 'Corps Member, Lagos State',
      content: 'MCAN has been instrumental in my NYSC journey. The support and community are amazing!',
      avatar: 'AI',
    },
    {
      name: 'Muhammad Hassan',
      role: 'State Secretary, Kano',
      content: 'The digital platform has revolutionized how we manage our state chapter operations.',
      avatar: 'MH',
    },
    {
      name: 'Fatima Usman',
      role: 'MCLO Ameer, Abuja',
      content: 'The e-ID system and payment management have made everything so much easier.',
      avatar: 'FU',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `
            linear-gradient(135deg, rgba(46, 125, 50, 0.9) 0%, rgba(76, 175, 80, 0.8) 100%),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="islamic" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23islamic)"/></svg>')
          `,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  Serving Islam through the Nation
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    fontWeight: 300,
                  }}
                >
                  Muslim Corpers Association of Nigeria
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    opacity: 0.8,
                  }}
                >
                  Uniting Muslim Corps Members across Nigeria's 36 states and FCT since 1978. 
                  Join our community and be part of a legacy of service, unity, and Islamic values.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      backgroundColor: '#FFD54F',
                      color: '#1B5E20',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: '#FFC107',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Join MCAN
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/about')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: 'white',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box
                    component="img"
                    src={mcanLogo}
                    alt="MCAN Logo"
                    sx={{
                      height: 80,
                      width: 'auto',
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    }}
                  />
                  <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                    MCAN Statistics
                  </Typography>
                  <Grid container spacing={2}>
                    {stats.map((stat, index) => (
                      <Grid item xs={6} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar
                            sx={{
                              backgroundColor: stat.color,
                              width: 60,
                              height: 60,
                              mx: 'auto',
                              mb: 1,
                            }}
                          >
                            {stat.icon}
                          </Avatar>
                          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ mb: 2, color: 'primary.dark' }}>
              Our Digital Platform
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Comprehensive digital solutions for modern Muslim Corps Members
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 25px rgba(46, 125, 50, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Avatar
                        sx={{
                          backgroundColor: feature.color,
                          width: 60,
                          height: 60,
                          mb: 2,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" sx={{ mb: 2, color: 'primary.dark' }}>
                What Our Members Say
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Real experiences from our community
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card sx={{ height: '100%', p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2, backgroundColor: 'primary.main' }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                        "{testimonial.content}"
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card
            sx={{
              background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
              color: 'white',
              p: 6,
              textAlign: 'center',
            }}
          >
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Ready to Join MCAN?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Become part of Nigeria's largest Muslim Corps Members community
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  backgroundColor: '#FFD54F',
                  color: '#1B5E20',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#FFC107',
                  },
                }}
              >
                Register Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
