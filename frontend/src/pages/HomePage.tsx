import React, { useEffect, useState } from 'react';
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
  Chip,
  Stack,
  IconButton,
  Fade,
  Slide,
  Zoom,
  Paper,
  Divider,
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
  ArrowForward,
  PlayArrow,
  CheckCircle,
  Mosque,
  DirectionsBus,
  HomeWork,
  Phone,
  Email,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  MenuBook,
  Group,
  Speed,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import mcanLogo from '../assets/mcanlogo.jpg';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { 
      label: 'Active Members', 
      value: '15,000+', 
      icon: <People sx={{ fontSize: 40 }} />, 
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      description: 'Muslim Corps Members'
    },
    { 
      label: 'State Chapters', 
      value: '37', 
      icon: <LocationOn sx={{ fontSize: 40 }} />, 
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      description: 'Across Nigeria'
    },
    { 
      label: 'Years of Service', 
      value: '45+', 
      icon: <Star sx={{ fontSize: 40 }} />, 
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      description: 'Dedicated Service'
    },
    { 
      label: 'Properties Managed', 
      value: '200+', 
      icon: <Business sx={{ fontSize: 40 }} />, 
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
      description: 'Lodges, Buses & Masjids'
    },
  ];

  const features = [
    {
      title: 'Digital e-ID Cards',
      description: 'Generate and manage your MCAN digital identity card with QR code verification and blockchain security.',
      icon: <Security sx={{ fontSize: 48 }} />,
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      benefits: ['QR Code Verification', 'Blockchain Security', 'Instant Generation', 'Mobile Access']
    },
    {
      title: 'Smart Payment System',
      description: 'Consent-based monthly deduction system with transparent financial tracking and real-time analytics.',
      icon: <TrendingUp sx={{ fontSize: 48 }} />,
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      benefits: ['Auto Deduction', 'Real-time Analytics', 'Transparent Tracking', 'Mobile Payments']
    },
    {
      title: 'Property Management',
      description: 'Comprehensive management of MCAN properties including lodges, buses, masjids with IoT integration.',
      icon: <Business sx={{ fontSize: 48 }} />,
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      benefits: ['IoT Integration', 'Real-time Monitoring', 'Maintenance Tracking', 'Booking System']
    },
    {
      title: '24/7 Member Support',
      description: 'AI-powered support system with human backup for all MCAN members across Nigeria.',
      icon: <Support sx={{ fontSize: 48 }} />,
      gradient: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
      benefits: ['AI Chatbot', 'Human Support', 'Multi-language', 'Quick Response']
    },
  ];

  const services = [
    {
      title: 'Lodges',
      description: 'State-managed accommodation facilities',
      icon: <HomeWork sx={{ fontSize: 32 }} />,
      count: '50+',
      mainColor: theme.palette.primary.main,
      lightColor: theme.palette.primary.light
    },
    {
      title: 'Transportation',
      description: 'Transport assets and logistics',
      icon: <DirectionsBus sx={{ fontSize: 32 }} />,
      count: '30+',
      mainColor: theme.palette.secondary.main,
      lightColor: theme.palette.secondary.light
    },
    {
      title: 'Masjids',
      description: 'Prayer spaces and Islamic centers',
      icon: <Mosque sx={{ fontSize: 32 }} />,
      count: '25+',
      mainColor: theme.palette.success.main,
      lightColor: theme.palette.success.light
    },
  ];

  const testimonials = [
    {
      name: 'Aisha Ibrahim',
      role: 'Corps Member, Lagos State',
      content: 'MCAN has revolutionized how we manage our NYSC experience. The digital platform makes everything so seamless!',
      avatar: 'AI',
      rating: 5
    },
    {
      name: 'Hassan Musa',
      role: 'State Secretary, Abuja',
      content: 'The property management system has made our work so much easier. We can track everything in real-time.',
      avatar: 'HM',
      rating: 5
    },
    {
      name: 'Fatima Bello',
      role: 'Corps Member, Kano',
      content: 'The support system is amazing. I got help within minutes when I needed assistance with my accommodation.',
      avatar: 'FB',
      rating: 5
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)'
            : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 12 },
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.08) 0%, transparent 50%)
            `,
            zIndex: 1,
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={1000}>
                <Box>
                  <Chip
                    label="Serving Islam Through the Nation"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 600,
                      mb: 3,
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                  
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      mb: 3,
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Muslim Corpers Association of Nigeria
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    Empowering Muslim Corps Members across Nigeria with digital solutions, 
                    community support, and comprehensive services for a fulfilling NYSC experience.
                  </Typography>
                  
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      onClick={() => navigate('/register')}
                      sx={{
                        background: 'linear-gradient(135deg, #FF8F00 0%, #FFB74D 100%)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        boxShadow: '0 8px 25px rgba(255, 143, 0, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #E65100 0%, #FF9800 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 35px rgba(255, 143, 0, 0.4)',
                        },
                      }}
                    >
                      Join MCAN Today
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PlayArrow />}
                      onClick={() => navigate('/about')}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: 'white',
                          background: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Fade in={isVisible} timeout={1500}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'inline-block',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: -20,
                        right: -20,
                        bottom: -20,
                        background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        borderRadius: '50%',
                        animation: 'pulse 2s infinite',
                      },
                    }}
                  >
                    <Avatar
                      src={mcanLogo}
                      sx={{
                        width: { xs: 200, md: 300 },
                        height: { xs: 200, md: 300 },
                        border: '4px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, background: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Our Impact
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Empowering Muslim Corps Members across Nigeria with digital solutions and community support
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Slide direction="up" in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #1A1A1A 0%, #2A2A2A 100%)'
                        : 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: stat.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          color: 'white',
                        }}
                      >
                        {stat.icon}
                      </Box>
                      
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          background: stat.gradient,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {stat.label}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {stat.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, background: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Chip
                label="Features"
                color="primary"
                sx={{ fontWeight: 700, mb: 2 }}
              />
              <Typography variant="h2" sx={{ mb: 3 }}>
                Digital Solutions for Modern Corps Members
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Experience the future of NYSC with our comprehensive digital platform designed specifically for Muslim Corps Members
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Zoom in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      p: 4,
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #1A1A1A 0%, #2A2A2A 100%)'
                        : 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 3,
                          background: feature.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          color: 'white',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                        {feature.title}
                      </Typography>
                      
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <Chip
                            key={benefitIndex}
                            label={benefit}
                            size="small"
                            sx={{
                              background: 'rgba(27, 94, 32, 0.1)',
                              color: 'primary.main',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, background: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Our Services
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Comprehensive services designed to support Muslim Corps Members throughout their NYSC journey
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide direction="up" in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      height: '100%',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #1A1A1A 0%, #2A2A2A 100%)'
                        : 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${service.mainColor} 0%, ${service.lightColor} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          color: 'white',
                        }}
                      >
                        {service.icon}
                      </Box>
                      
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        {service.count}
                      </Typography>
                      
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {service.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, background: theme.palette.background.paper }}>
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h2" sx={{ mb: 3 }}>
                What Our Members Say
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Hear from Muslim Corps Members who have experienced the MCAN difference
              </Typography>
            </Box>
          </Fade>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide direction="up" in={isVisible} timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(145deg, #1A1A1A 0%, #2A2A2A 100%)'
                        : 'linear-gradient(145deg, #FFFFFF 0%, #FAFAFA 100%)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} sx={{ color: '#FFD700', fontSize: 20 }} />
                        ))}
                      </Box>
                      
                      <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                        "{testimonial.content}"
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)'
            : 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={isVisible} timeout={1000}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ mb: 3, fontWeight: 800 }}>
                Ready to Join MCAN?
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
                Become part of Nigeria's largest Muslim Corps Members community and 
                experience the future of NYSC with our digital platform.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/register')}
                  sx={{
                    background: 'linear-gradient(135deg, #FF8F00 0%, #FFB74D 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    boxShadow: '0 8px 25px rgba(255, 143, 0, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #E65100 0%, #FF9800 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 35px rgba(255, 143, 0, 0.4)',
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
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;