import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  Refresh,
  Notifications,
  NotificationsOff,
  AccessTime,
  WbSunny,
  NightsStay,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
  icon: React.ReactNode;
  color: string;
}

interface PrayerTimesProps {
  location?: string;
  onLocationChange?: (location: string) => void;
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ 
  location = 'Lagos, Nigeria',
  onLocationChange 
}) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [, setCurrentTime] = useState(new Date());

  // Mock prayer times - in real app, this would come from an API
  const mockPrayerTimes = [
    { name: 'Fajr', time: '05:30', icon: <WbSunny />, color: '#FF9800' },
    { name: 'Dhuhr', time: '12:45', icon: <WbSunny />, color: '#FFC107' },
    { name: 'Asr', time: '15:30', icon: <WbSunny />, color: '#FF5722' },
    { name: 'Maghrib', time: '18:15', icon: <NightsStay />, color: '#9C27B0' },
    { name: 'Isha', time: '19:30', icon: <NightsStay />, color: '#673AB7' },
  ];

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Load prayer times
    loadPrayerTimes();

    return () => clearInterval(timer);
  }, [location, loadPrayerTimes]);

  const loadPrayerTimes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, call prayer times API
      const times = mockPrayerTimes.map((prayer, index) => ({
        ...prayer,
        isNext: index === 0, // Mock logic for next prayer
      }));
      
      setPrayerTimes(times);
    } catch (err) {
      setError('Failed to load prayer times');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationToggle = () => {
    if (!notificationsEnabled) {
      // Request notification permission
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            setNotificationsEnabled(true);
          }
        });
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  const getNextPrayer = () => {
    return prayerTimes.find(prayer => prayer.isNext);
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return format(today, 'EEEE, MMMM do, yyyy');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" action={
        <IconButton onClick={loadPrayerTimes} color="inherit">
          <Refresh />
        </IconButton>
      }>
        {error}
      </Alert>
    );
  }

  const nextPrayer = getNextPrayer();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}>
              <IconButton onClick={handleNotificationToggle} color={notificationsEnabled ? 'primary' : 'default'}>
                {notificationsEnabled ? <Notifications /> : <NotificationsOff />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh prayer times">
              <IconButton onClick={loadPrayerTimes}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {getCurrentDate()}
        </Typography>
        
        {nextPrayer && (
          <Chip
            label={`Next: ${nextPrayer.name} at ${nextPrayer.time}`}
            color="primary"
            variant="outlined"
            icon={<AccessTime />}
          />
        )}
      </Box>

      {/* Prayer Times Grid */}
      <Grid container spacing={2}>
        {prayerTimes.map((prayer, index) => (
          <Grid item xs={12} sm={6} md={4} key={prayer.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  border: prayer.isNext ? `2px solid ${prayer.color}` : '1px solid #e0e0e0',
                  backgroundColor: prayer.isNext ? `${prayer.color}10` : 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 25px ${prayer.color}30`,
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      color: prayer.color,
                      mb: 2,
                      '& .MuiSvgIcon-root': {
                        fontSize: '2rem',
                      },
                    }}
                  >
                    {prayer.icon}
                  </Box>
                  
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {prayer.name}
                  </Typography>
                  
                  <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 1 }}>
                    {formatTime(prayer.time)}
                  </Typography>
                  
                  {prayer.isNext && (
                    <Chip
                      label="Next Prayer"
                      size="small"
                      sx={{
                        backgroundColor: prayer.color,
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Islamic Calendar Info */}
      <Card sx={{ mt: 3, backgroundColor: '#f8f9fa' }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Islamic Calendar
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Hijri Date:</strong> 15th Rabi' al-Awwal, 1446 AH
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Qibla Direction:</strong> 65° Northeast
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PrayerTimes;
