import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Stepper, Step, StepLabel, Box, Accordion, AccordionSummary, AccordionDetails, Chip, Button, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';

const MembershipPage: React.FC = () => {
  const steps = ['Create Account', 'Complete Profile', 'Verify Email', 'Engage & Participate'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Chip label="Join MCAN" color="primary" sx={{ fontWeight: 700, mb: 1 }} />
        <Typography variant="h2" sx={{ textAlign: 'center', color: 'primary.dark', fontWeight: 900 }}>
          Membership
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          Be part of a nationwide network of Muslim corps members.
        </Typography>
      </Box>

      {/* Benefits */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[{
          title: 'Spiritual Growth',
          desc: 'Lectures, Al-Usrah, and Qur\'an classes to strengthen faith.'
        }, {
          title: 'Community Service',
          desc: 'Participate in impactful projects benefiting local communities.'
        }, {
          title: 'Networking',
          desc: 'Connect with peers and mentors across all MCAN chapters.'
        }].map((b) => (
          <Grid item xs={12} md={4} key={b.title}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{b.title}</Typography>
                <Typography color="text.secondary">{b.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Steps */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>How to Join</Typography>
        <Stepper activeStep={-1} alternativeLabel sx={{ mb: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button component={RouterLink} to="/register" variant="contained" color="primary">Register</Button>
          <Button component={RouterLink} to="/services" variant="outlined" color="primary">Explore Programs</Button>
        </Stack>
      </Box>

      {/* FAQs */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Frequently Asked Questions</Typography>
        {[{
          q: 'Who can join MCAN?',
          a: 'NYSC corps members and interested Muslim graduates can join.'
        }, {
          q: 'Is there a membership fee?',
          a: 'Some chapters may collect dues to support programs; details will be communicated locally.'
        }, {
          q: 'How do I find my state chapter?',
          a: 'Visit the States page and select your current deployment state.'
        }].map((item) => (
          <Accordion key={item.q}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}> 
              <Typography sx={{ fontWeight: 700 }}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default MembershipPage;
