import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Button, Divider, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import mcanLogo from '../assets/mcanlogo.jpg';

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
    <CardContent>
      <Typography variant="h4" color="primary" sx={{ fontWeight: 700, mb: 1 }}>{value}</Typography>
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
    </CardContent>
  </Card>
);

const Pill: React.FC<{ text: string; color?: 'default' | 'primary' | 'success' }>= ({ text, color = 'default' }) => (
  <Chip label={text} color={color === 'success' ? 'success' : color === 'primary' ? 'primary' : undefined} sx={{ mr: 1, mb: 1, fontWeight: 600 }} />
);

const SectionHeading: React.FC<{ title: string; subtitle?: string }>= ({ title, subtitle }) => (
  <Box sx={{ textAlign: 'center', mb: 4 }}>
    <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.dark', mb: 1 }}>{title}</Typography>
    {subtitle && <Typography variant="subtitle1" color="text.secondary">{subtitle}</Typography>}
  </Box>
);

const AboutPage: React.FC = () => {
  return (
    <Box>
      {/* Hero */}
      <Box className="islamic-pattern" sx={{ bgcolor: 'var(--mcan-background)', pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip label="About MCAN" color="primary" sx={{ fontWeight: 700, mb: 2 }} />
              <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1.1, color: 'primary.dark', mb: 2 }}>
                Muslim Corpers' Association of Nigeria
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                A national body fostering a strong network of Muslim youth corps members across Nigeria since 1978/1979; officially registered with the Corporate Affairs Commission (CAC) in 1994. National headquarters: Mabushi, Abuja; branches in all 36 states and the FCT.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button component={RouterLink} to="/register" size="large" variant="contained" color="primary">
                  Register
                </Button>
                <Button component={RouterLink} to="/services" size="large" variant="outlined" color="primary">
                  Explore Programs
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box className="islamic-border" sx={{ p: 1, borderRadius: 2 }}>
                  <Box component="img" src={mcanLogo} alt="MCAN Logo" sx={{ width: '100%', maxWidth: 420, borderRadius: 2 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} sm={4}><StatCard label="Years of Service" value="45+" /></Grid>
            <Grid item xs={12} sm={4}><StatCard label="States & FCT" value="37" /></Grid>
            <Grid item xs={12} sm={4}><StatCard label="National Chapters" value="Nationwide" /></Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission / Vision / Slogan */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading title="Our Core Direction" subtitle="Mission, Vision and Slogan" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Mission</Typography>
                <Typography color="text.secondary">
                  Adherence to the pristine teachings of Islam in all affairs of life.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Vision</Typography>
                <Typography color="text.secondary">
                  Towards achieving an ideal, morally bounded Islamic society.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', borderTop: '4px solid', borderColor: 'primary.main' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Slogan</Typography>
                <Typography color="text.secondary">
                  Serving Islam (Allah) through the Nation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Aims and Objectives */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading title="Aims and Objectives" subtitle="What we are organized to achieve" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Coordination & Support</Typography>
                <Typography component="ol" sx={{ pl: 3 }}>
                  <li>Serve as a coordinating body and forum for exchange of ideas among Muslim corps members nationwide.</li>
                  <li>Protect the legitimate rights and interests of Muslim corps members across Nigeria.</li>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Islamic Development</Typography>
                <Typography component="ol" sx={{ pl: 3 }}>
                  <li>Promote the correct understanding of Islam among corps members, students and the broader public.</li>
                  <li>Coordinate efforts with Islamic organizations in propagating Islam across Nigeria and beyond.</li>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Programs */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading title="Programs" subtitle="Aligned with the NYSC calendar for maximum impact" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Pre-Orientation</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  In collaboration with MSSN across higher institutions; seminars and sensitization 2–3 months before camp.
                </Typography>
                <Pill text="Seminars" color="primary" />
                <Pill text="Pamphlets" />
                <Pill text="Campus Outreach" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Orientation Camp</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Lectures, Da'wah, Qur'an memorization, humanitarian projects, and interfaith outreach.
                </Typography>
                <Pill text="Da'wah" color="primary" />
                <Pill text="Memorization" />
                <Pill text="Projects" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Post-Orientation</Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Al-Usrah, Arabic/Qur'an classes, village Da'wah, media programs, leadership seminars, tutorials and more.
                </Typography>
                <Pill text="Al-Usrah" color="primary" />
                <Pill text="Arabic/Qur'an" />
                <Pill text="Media Programs" />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      {/* Core Values */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <SectionHeading title="Our Core Values" subtitle="What guides our conduct and service" />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Compassion</Typography>
                <Typography color="text.secondary">Empathy and care for all members on their spiritual and professional journey.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Knowledge</Typography>
                <Typography color="text.secondary">Continuous learning of Islamic principles alongside modern knowledge.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Service</Typography>
                <Typography color="text.secondary">Commitment to impactful service and positive societal contribution.</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Join MCAN</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Be part of a nationwide network of Muslim corps members serving Islam and the Nation.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: { md: 'flex-end' } }}>
                <Button component={RouterLink} to="/register" size="large" variant="contained" color="secondary">
                  Register Now
                </Button>
                <Button component={RouterLink} to="/contact" size="large" variant="outlined" sx={{ color: 'white', borderColor: 'white' }}>
                  Contact Us
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
