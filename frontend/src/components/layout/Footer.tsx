import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
  AccessTime,
} from '@mui/icons-material';
import mcanLogo from '../../assets/mcanlogo.jpg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About MCAN', path: '/about' },
    { label: 'Membership', path: '/membership' },
    { label: 'Services', path: '/services' },
    { label: 'State Chapters', path: '/states' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const services = [
    { label: 'e-ID Card Generation', path: '/eid' },
    { label: 'Payment System', path: '/services' },
    { label: 'Property Management', path: '/services' },
    { label: 'Support Marketplace', path: '/services' },
    { label: 'Islamic Resources', path: '/prayer-times' },
  ];

  const socialLinks = [
    { icon: <Facebook />, url: 'https://facebook.com/mcan.nigeria', label: 'Facebook' },
    { icon: <Twitter />, url: 'https://twitter.com/mcan_nigeria', label: 'Twitter' },
    { icon: <Instagram />, url: 'https://instagram.com/mcan_nigeria', label: 'Instagram' },
    { icon: <LinkedIn />, url: 'https://linkedin.com/company/mcan-nigeria', label: 'LinkedIn' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0D4F1C 0%, #1B5E20 50%, #2E7D32 100%)',
        color: 'white',
        mt: 'auto',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6}>
          {/* MCAN Info */}
          <Grid item xs={12} md={4}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  component="img"
                  src={mcanLogo}
                  alt="MCAN Logo"
                  sx={{
                    height: 40,
                    width: 'auto',
                    mr: 2,
                    borderRadius: 1,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                />
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 800,
                    color: '#FFD54F',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '0.5px',
                  }}
                >
                  MCAN
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1rem',
                  fontWeight: 400,
                }}
              >
                Muslim Corpers Association of Nigeria - Serving Islam through the Nation since 1978.
                Uniting Muslim Corps Members across Nigeria's 36 states and FCT.
              </Typography>
              
              {/* Contact Info */}
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 1.5, fontSize: 18, color: '#FFD54F' }} />
                  <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ fontWeight: 500 }}>
                    National Secretariat, Abuja, Nigeria
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 1.5, fontSize: 18, color: '#FFD54F' }} />
                  <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ fontWeight: 500 }}>
                    +234 (0) 800 MCAN-HELP
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 1.5, fontSize: 18, color: '#FFD54F' }} />
                  <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ fontWeight: 500 }}>
                    info@mcan.org.ng
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1.5, fontSize: 18, color: '#FFD54F' }} />
                  <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ fontWeight: 500 }}>
                    Mon - Fri: 8:00 AM - 5:00 PM
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#FFD54F',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                letterSpacing: '0.3px',
              }}
            >
              Quick Links
            </Typography>
            <Box>
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  sx={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    mb: 2,
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FFD54F',
                      textDecoration: 'none',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#FFD54F',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                letterSpacing: '0.3px',
              }}
            >
              Our Services
            </Typography>
            <Box>
              {services.map((service) => (
                <Link
                  key={service.path}
                  href={service.path}
                  sx={{
                    display: 'block',
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    mb: 2,
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#FFD54F',
                      textDecoration: 'none',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {service.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Social Media & Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                mb: 3,
                color: '#FFD54F',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                letterSpacing: '0.3px',
              }}
            >
              Connect With Us
            </Typography>
            
            {/* Social Media */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ mb: 2, fontWeight: 500 }}>
                Follow us on social media
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#FFD54F',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(255, 213, 79, 0.3)',
                      },
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Islamic Quote */}
            <Box
              sx={{
                p: 3,
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.95)',
                  textAlign: 'center',
                  mb: 2,
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                "And whoever does righteous deeds - whether male or female - while being a believer, 
                they will enter Paradise and will not be wronged even as much as the speck on a date seed."
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#FFD54F',
                  textAlign: 'center',
                  display: 'block',
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                }}
              >
                - Quran 4:124
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography
            variant="body1"
            color="rgba(255,255,255,0.8)"
            sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              fontWeight: 500,
            }}
          >
            © {currentYear} Muslim Corpers Association of Nigeria. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Link
              href="/privacy"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FFD54F',
                  textDecoration: 'none',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FFD54F',
                  textDecoration: 'none',
                },
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#FFD54F',
                  textDecoration: 'none',
                },
              }}
            >
              Accessibility
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
