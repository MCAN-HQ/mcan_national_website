import React, { useState, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  People,
  Business,
  Close,
  Directions,
  WhatsApp,
  Facebook,
  Twitter,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface StateChapter {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  ameer: string;
  phone: string;
  email: string;
  address: string;
  memberCount: number;
  properties: number;
  established: string;
  socialMedia: {
    whatsapp?: string;
    facebook?: string;
    twitter?: string;
  };
  activities: string[];
  contactPerson: string;
  contactPhone: string;
}

const StateChaptersMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateChapter | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data for Nigerian states with MCAN chapters
  const stateChapters: StateChapter[] = [
    {
      id: 'lagos',
      name: 'MCAN Lagos',
      state: 'Lagos State',
      coordinates: [6.5244, 3.3792],
      ameer: 'Ahmad Ibrahim',
      phone: '+234 802 123 4567',
      email: 'lagos@mcan.org.ng',
      address: 'Ikeja, Lagos State',
      memberCount: 2500,
      properties: 15,
      established: '1980',
      socialMedia: {
        whatsapp: '+234 802 123 4567',
        facebook: 'MCAN Lagos',
        twitter: '@MCANLagos'
      },
      activities: ['Weekly Tafsir', 'Arabic Classes', 'Community Service', 'Youth Programs'],
      contactPerson: 'Fatima Abdullahi',
      contactPhone: '+234 803 456 7890'
    },
    {
      id: 'abuja',
      name: 'MCAN Abuja',
      state: 'Federal Capital Territory',
      coordinates: [9.0765, 7.3986],
      ameer: 'Muhammad Hassan',
      phone: '+234 805 234 5678',
      email: 'abuja@mcan.org.ng',
      address: 'Mabushi, Abuja',
      memberCount: 1800,
      properties: 12,
      established: '1985',
      socialMedia: {
        whatsapp: '+234 805 234 5678',
        facebook: 'MCAN Abuja',
        twitter: '@MCANAbuja'
      },
      activities: ['National Programs', 'Leadership Training', 'Interfaith Dialogue', 'Media Programs'],
      contactPerson: 'Aisha Yusuf',
      contactPhone: '+234 806 345 6789'
    },
    {
      id: 'kano',
      name: 'MCAN Kano',
      state: 'Kano State',
      coordinates: [12.0022, 8.5920],
      ameer: 'Ibrahim Musa',
      phone: '+234 807 345 6789',
      email: 'kano@mcan.org.ng',
      address: 'Kano City, Kano State',
      memberCount: 2200,
      properties: 18,
      established: '1979',
      socialMedia: {
        whatsapp: '+234 807 345 6789',
        facebook: 'MCAN Kano',
        twitter: '@MCANKano'
      },
      activities: ['Quran Memorization', 'Islamic Education', 'Community Development', 'Youth Empowerment'],
      contactPerson: 'Zainab Ahmad',
      contactPhone: '+234 808 456 7890'
    },
    {
      id: 'rivers',
      name: 'MCAN Rivers',
      state: 'Rivers State',
      coordinates: [4.8156, 7.0498],
      ameer: 'Abdullahi Port Harcourt',
      phone: '+234 809 456 7890',
      email: 'rivers@mcan.org.ng',
      address: 'Port Harcourt, Rivers State',
      memberCount: 1200,
      properties: 8,
      established: '1990',
      socialMedia: {
        whatsapp: '+234 809 456 7890',
        facebook: 'MCAN Rivers',
        twitter: '@MCANRivers'
      },
      activities: ['Oil & Gas Programs', 'Environmental Awareness', 'Community Service', 'Educational Support'],
      contactPerson: 'Maryam Hassan',
      contactPhone: '+234 810 567 8901'
    },
    {
      id: 'kaduna',
      name: 'MCAN Kaduna',
      state: 'Kaduna State',
      coordinates: [10.5200, 7.4383],
      ameer: 'Yusuf Kaduna',
      phone: '+234 811 567 8901',
      email: 'kaduna@mcan.org.ng',
      address: 'Kaduna City, Kaduna State',
      memberCount: 1500,
      properties: 10,
      established: '1982',
      socialMedia: {
        whatsapp: '+234 811 567 8901',
        facebook: 'MCAN Kaduna',
        twitter: '@MCANKaduna'
      },
      activities: ['Interfaith Programs', 'Peace Building', 'Educational Support', 'Community Development'],
      contactPerson: 'Hafsat Ibrahim',
      contactPhone: '+234 812 678 9012'
    }
  ];

  const handleStateClick = useCallback((state: StateChapter) => {
    setSelectedState(state);
    setDialogOpen(true);
  }, []);

  const getStateColor = (memberCount: number) => {
    if (memberCount >= 2000) return '#4CAF50';
    if (memberCount >= 1500) return '#8BC34A';
    if (memberCount >= 1000) return '#FFC107';
    return '#FF9800';
  };

  const getStateSize = (memberCount: number) => {
    if (memberCount >= 2000) return 40;
    if (memberCount >= 1500) return 35;
    if (memberCount >= 1000) return 30;
    return 25;
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'primary.dark' }}>
          MCAN State Chapters
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Explore our network of state chapters across Nigeria
        </Typography>
      </Box>

      {/* Interactive Map Grid */}
      <Grid container spacing={3}>
        {stateChapters.map((state, index) => (
          <Grid item xs={12} sm={6} md={4} key={state.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => handleStateClick(state)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: getStateColor(state.memberCount),
                        width: getStateSize(state.memberCount),
                        height: getStateSize(state.memberCount),
                        mr: 2,
                      }}
                    >
                      <LocationOn />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {state.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {state.state}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${state.memberCount} members`}
                      color="primary"
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Ameer:</strong> {state.ameer}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      <strong>Established:</strong> {state.established}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Properties:</strong> {state.properties} facilities
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {state.activities.slice(0, 2).map((activity, idx) => (
                      <Chip
                        key={idx}
                        label={activity}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                    {state.activities.length > 2 && (
                      <Chip
                        label={`+${state.activities.length - 2} more`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* State Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {selectedState?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedState?.state}
            </Typography>
          </Box>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedState && (
            <Grid container spacing={3}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Contact Information
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <People />
                        </ListItemIcon>
                        <ListItemText
                          primary="Ameer"
                          secondary={selectedState.ameer}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Phone />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone"
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {selectedState.phone}
                              <Tooltip title="Call">
                                <IconButton size="small">
                                  <Phone fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="WhatsApp">
                                <IconButton size="small">
                                  <WhatsApp fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Email />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email"
                          secondary={selectedState.email}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <LocationOn />
                        </ListItemIcon>
                        <ListItemText
                          primary="Address"
                          secondary={selectedState.address}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              {/* Statistics */}
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Chapter Statistics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="primary.dark">
                            {selectedState.memberCount}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Active Members
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="secondary.dark">
                            {selectedState.properties}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Properties
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Activities */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Chapter Activities
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {selectedState.activities.map((activity, index) => (
                        <Chip
                          key={index}
                          label={activity}
                          color="primary"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Social Media */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                      Connect With Us
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {selectedState.socialMedia.whatsapp && (
                        <Button
                          startIcon={<WhatsApp />}
                          variant="outlined"
                          color="success"
                          href={`https://wa.me/${selectedState.socialMedia.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                        >
                          WhatsApp
                        </Button>
                      )}
                      {selectedState.socialMedia.facebook && (
                        <Button
                          startIcon={<Facebook />}
                          variant="outlined"
                          color="primary"
                          href={`https://facebook.com/${selectedState.socialMedia.facebook}`}
                          target="_blank"
                        >
                          Facebook
                        </Button>
                      )}
                      {selectedState.socialMedia.twitter && (
                        <Button
                          startIcon={<Twitter />}
                          variant="outlined"
                          color="info"
                          href={`https://twitter.com/${selectedState.socialMedia.twitter}`}
                          target="_blank"
                        >
                          Twitter
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<Directions />}
            href={`https://maps.google.com/?q=${selectedState?.address}`}
            target="_blank"
          >
            Get Directions
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StateChaptersMap;
