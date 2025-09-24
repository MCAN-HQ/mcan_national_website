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
        backgroundColor: '#1B5E20',
        color: 'white',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
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
                    fontWeight: 'bold',
                    color: '#FFD54F',
                  }}
                >
                  MCAN
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Muslim Corpers Association of Nigeria - Serving Islam through the Nation since 1978.
                Uniting Muslim Corps Members across Nigeria's 36 states and FCT.
              </Typography>
              
              {/* Contact Info */}
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 16, color: '#FFD54F' }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    National Secretariat, Abuja, Nigeria
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Phone sx={{ mr: 1, fontSize: 16, color: '#FFD54F' }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    +234 (0) 800 MCAN-HELP
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1, fontSize: 16, color: '#FFD54F' }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
                    info@mcan.org.ng
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ mr: 1, fontSize: 16, color: '#FFD54F' }} />
                  <Typography variant="body2" color="rgba(255,255,255,0.8)">
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
                fontWeight: 'bold',
                mb: 2,
                color: '#FFD54F',
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
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: '#FFD54F',
                      textDecoration: 'underline',
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
                fontWeight: 'bold',
                mb: 2,
                color: '#FFD54F',
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
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    mb: 1,
                    '&:hover': {
                      color: '#FFD54F',
                      textDecoration: 'underline',
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
                fontWeight: 'bold',
                mb: 2,
                color: '#FFD54F',
              }}
            >
              Connect With Us
            </Typography>
            
            {/* Social Media */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="rgba(255,255,255,0.8)" sx={{ mb: 1 }}>
                Follow us on social media
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      '&:hover': {
                        color: '#FFD54F',
                        backgroundColor: 'rgba(255,255,255,0.1)',
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
                p: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                "And whoever does righteous deeds - whether male or female - while being a believer, 
                they will enter Paradise and will not be wronged even as much as the speck on a date seed."
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#FFD54F',
                  textAlign: 'center',
                  display: 'block',
                }}
              >
                - Quran 4:124
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.7)"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            © {currentYear} Muslim Corpers Association of Nigeria. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="/privacy"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#FFD54F',
                  textDecoration: 'underline',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#FFD54F',
                  textDecoration: 'underline',
                },
              }}
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#FFD54F',
                  textDecoration: 'underline',
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
