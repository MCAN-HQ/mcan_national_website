import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Chip, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StatesPage: React.FC = () => {
  const states = [
    'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Chip label="Chapters" color="primary" sx={{ fontWeight: 700, mb: 1 }} />
        <Typography variant="h2" sx={{ textAlign: 'center', color: 'primary.dark', fontWeight: 900 }}>
          State Chapters
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
          MCAN operates across all 36 states and the Federal Capital Territory.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {states.map((state) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={state}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>{state}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Programs, properties, and activities in {state}.
                </Typography>
                <Button
                  component={RouterLink}
                  to={`/services/properties?state=${encodeURIComponent(state)}`}
                  size="small"
                  variant="outlined"
                >
                  View Properties
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StatesPage;
