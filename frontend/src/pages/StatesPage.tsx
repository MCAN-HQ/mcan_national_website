import React from 'react';
import { Container, Typography, Box, Chip, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import StateChaptersMap from '../components/map/StateChaptersMap';

const StatesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Interactive Map" />
          <Tab label="All States" />
        </Tabs>
      </Box>

      {activeTab === 0 && <StateChaptersMap />}
      {activeTab === 1 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Full state listing coming soon...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default StatesPage;
