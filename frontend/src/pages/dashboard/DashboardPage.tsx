import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const role = user?.role || 'MEMBER';

  const tiles = {
    SUPER_ADMIN: ['National Stats', 'All Members', 'Financials', 'Properties', 'Marketplace', 'Reports'],
    NATIONAL_ADMIN: ['National Stats', 'States', 'Financials', 'Properties', 'Reports'],
    STATE_AMEER: ['State Stats', 'Members', 'Payments', 'Properties', 'Reports'],
    STATE_SECRETARY: ['State Admin', 'Members', 'Payments', 'Properties'],
    MCLO_AMEER: ['Local Chapter', 'Members', 'Activities'],
    MEMBER: ['My Profile', 'Membership', 'Payments', 'e-ID'],
  } as Record<string, string[]>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Chip label={role.replace('_', ' ')} color="success" />
      </Box>

      <Grid container spacing={3}>
        {tiles[role].map((t) => (
          <Grid item xs={12} sm={6} md={4} key={t}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {t}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Section for {t} goes here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;
