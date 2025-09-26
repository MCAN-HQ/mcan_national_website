import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Autocomplete,
  Snackbar,
} from '@mui/material';
import {
  LocationOn,
  Refresh,
  Notifications,
  NotificationsOff,
  AccessTime,
  WbSunny,
  NightsStay,
  MyLocation,
  Search,
  Navigation,
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
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [hijriDate, setHijriDate] = useState<string>('');

  // Nigerian cities for location search
  const nigerianCities = [
    'Lagos, Nigeria', 'Abuja, Nigeria', 'Kano, Nigeria', 'Ibadan, Nigeria',
    'Port Harcourt, Nigeria', 'Kaduna, Nigeria', 'Maiduguri, Nigeria',
    'Ilorin, Nigeria', 'Jos, Nigeria', 'Zaria, Nigeria', 'Benin City, Nigeria',
    'Ilesa, Nigeria', 'Oyo, Nigeria', 'Ikerre, Nigeria', 'Abeokuta, Nigeria',
    'Enugu, Nigeria', 'Sokoto, Nigeria', 'Calabar, Nigeria', 'Uyo, Nigeria',
    'Akure, Nigeria', 'Owerri, Nigeria', 'Bauchi, Nigeria', 'Katsina, Nigeria',
    'Gombe, Nigeria', 'Yola, Nigeria', 'Makurdi, Nigeria', 'Lafia, Nigeria',
    'Minna, Nigeria', 'Lokoja, Nigeria', 'Asaba, Nigeria', 'Awka, Nigeria',
    'Ado-Ekiti, Nigeria', 'Osogbo, Nigeria', 'Abeokuta, Nigeria', 'Ibadan, Nigeria'
  ];

  // Mock prayer times - in real app, this would come from an API
  const mockPrayerTimes = useMemo(() => [
    { name: 'Fajr', time: '05:30', icon: <WbSunny />, color: '#FF9800' },
    { name: 'Dhuhr', time: '12:45', icon: <WbSunny />, color: '#FFC107' },
    { name: 'Asr', time: '15:30', icon: <WbSunny />, color: '#FF5722' },
    { name: 'Maghrib', time: '18:15', icon: <NightsStay />, color: '#9C27B0' },
    { name: 'Isha', time: '19:30', icon: <NightsStay />, color: '#673AB7' },
  ], []);

  const getNextPrayerIndex = useCallback(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Convert prayer times to minutes for comparison
    const prayerTimesInMinutes = mockPrayerTimes.map(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      return hours * 60 + minutes;
    });
    
    // Find the next prayer time
    for (let i = 0; i < prayerTimesInMinutes.length; i++) {
      if (prayerTimesInMinutes[i] > currentTime) {
        return i;
      }
    }
    
    // If no prayer time is found after current time, the next prayer is tomorrow's Fajr (index 0)
    return 0;
  }, [mockPrayerTimes]);

  const detectCurrentLocation = useCallback(async () => {
    setDetectingLocation(true);
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Reverse geocoding to get city name
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();
      
      const cityName = data.city || data.locality || 'Unknown';
      const countryName = data.countryName || 'Nigeria';
      const newLocation = `${cityName}, ${countryName}`;
      
      if (onLocationChange) {
        onLocationChange(newLocation);
      }
      
      setSnackbarMessage(`Location updated to ${newLocation}`);
      setSnackbarOpen(true);
      
      // Calculate Qibla direction
      const qiblaAngle = calculateQiblaDirection(latitude, longitude);
      setQiblaDirection(qiblaAngle);
      
    } catch (error) {
      console.error('Error detecting location:', error);
      setSnackbarMessage('Unable to detect location. Please select manually.');
      setSnackbarOpen(true);
    } finally {
      setDetectingLocation(false);
    }
  }, [onLocationChange]);

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    const dLng = (kaabaLng - lng) * Math.PI / 180;
    const lat1 = lat * Math.PI / 180;
    const lat2 = kaabaLat * Math.PI / 180;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
  };

  const loadPrayerTimes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get the index of the next prayer
      const nextPrayerIndex = getNextPrayerIndex();
      
      // In real app, call prayer times API
      const times = mockPrayerTimes.map((prayer, index) => ({
        ...prayer,
        isNext: index === nextPrayerIndex,
      }));
      
      setPrayerTimes(times);
      
      // Set Hijri date (mock for now)
      setHijriDate('15th Rabi\' al-Awwal, 1446 AH');
      
    } catch (err) {
      setError('Failed to load prayer times');
    } finally {
      setLoading(false);
    }
  }, [mockPrayerTimes, getNextPrayerIndex]);

  useEffect(() => {
    // Update current time every minute and reload prayer times to update next prayer
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      loadPrayerTimes(); // Reload to update next prayer
    }, 60000);

    // Load prayer times initially
    loadPrayerTimes();

    return () => clearInterval(timer);
  }, [location, loadPrayerTimes]);

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
            <Button
              size="small"
              startIcon={<MyLocation />}
              onClick={detectCurrentLocation}
              disabled={detectingLocation}
              sx={{ ml: 1 }}
            >
              {detectingLocation ? 'Detecting...' : 'Detect'}
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Change location">
              <IconButton onClick={() => setLocationDialogOpen(true)}>
                <Search />
              </IconButton>
            </Tooltip>
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
                <strong>Hijri Date:</strong> {hijriDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                <strong>Qibla Direction:</strong> {qiblaDirection ? `${Math.round(qiblaDirection)}°` : 'Calculating...'}
                {qiblaDirection && (
                  <Navigation sx={{ ml: 1, transform: `rotate(${qiblaDirection}deg)` }} />
                )}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Location Selection Dialog */}
      <Dialog open={locationDialogOpen} onClose={() => setLocationDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Select Location</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={nigerianCities}
            value={searchLocation}
            onChange={(_, newValue) => setSearchLocation(newValue || '')}
            onInputChange={(_, newInputValue) => setSearchLocation(newInputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for a city"
                placeholder="Type to search..."
                fullWidth
                sx={{ mt: 2 }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLocationDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              if (searchLocation && onLocationChange) {
                onLocationChange(searchLocation);
                setSnackbarMessage(`Location updated to ${searchLocation}`);
                setSnackbarOpen(true);
              }
              setLocationDialogOpen(false);
            }}
            variant="contained"
            disabled={!searchLocation}
          >
            Update Location
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default PrayerTimes;
