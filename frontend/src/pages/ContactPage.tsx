import React from 'react';
import { Container, Typography, Grid, TextField, Button, Card, CardContent, Box, Chip, Stack } from '@mui/material';

const ContactPage: React.FC = () => {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email is required';
    if (!form.message.trim()) next.message = 'Please enter a message';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: Hook up to backend endpoint when available
    alert('Thank you for contacting MCAN. We will respond shortly.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Chip label="Get in Touch" color="primary" sx={{ fontWeight: 700, mb: 1 }} />
        <Typography variant="h2" sx={{ textAlign: 'center', color: 'primary.dark', fontWeight: 900 }}>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          We\'re here to support you. Reach out any time.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Send a Message</Typography>
              <Box component="form" noValidate onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                  />
                  <TextField
                    label="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    fullWidth
                  />
                  <TextField
                    label="Message"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    error={Boolean(errors.message)}
                    helperText={errors.message}
                    fullWidth
                    multiline
                    minRows={4}
                  />
                  <Button type="submit" variant="contained" color="primary" size="large">
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Contact Information</Typography>
              <Stack spacing={1}>
                <Typography><strong>Email:</strong> info@mcanlagos.com.ng</Typography>
                <Typography><strong>Phone:</strong> +234 706 899 5770</Typography>
                <Typography><strong>Headquarters:</strong> Mabushi, Abuja (National HQ)</Typography>
                <Typography color="text.secondary">Reach out to your state chapter via the States page for local activities and support.</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactPage;
