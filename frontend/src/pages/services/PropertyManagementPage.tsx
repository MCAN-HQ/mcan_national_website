import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { Search, Place, Category } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { propertyService } from '../../services/propertyService';

interface PropertyItem {
  id: string;
  name: string;
  type: 'LODGE' | 'BUS' | 'MASJID' | 'OTHER';
  state: string;
  location: string;
  capacity?: number;
  condition?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
  manager?: string;
  status: 'ACTIVE' | 'UNDER_MAINTENANCE' | 'UNAVAILABLE';
  ownership: 'MCAN' | 'LEASED' | 'DONATED';
  lastUpdated: string;
}

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'
];

const PropertyManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [stateFilter, setStateFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const canManageAllStates = user?.role === 'SUPER_ADMIN' || user?.role === 'NATIONAL_ADMIN';
  const effectiveState = useMemo(() => {
    if (!canManageAllStates) return user?.deploymentState || user?.stateCode || '';
    return stateFilter;
  }, [canManageAllStates, stateFilter, user]);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await propertyService.list({ state: effectiveState || undefined, type: typeFilter || undefined, q: search || undefined });
        setProperties(data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [effectiveState, typeFilter, search]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 3, color: 'primary.dark', textAlign: 'center' }}>
        Property Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              placeholder="Search by name or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="State"
              value={effectiveState}
              onChange={(e) => setStateFilter(e.target.value)}
              disabled={!canManageAllStates}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Place />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All States</MenuItem>
              {NIGERIAN_STATES.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Category />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="LODGE">Lodge</MenuItem>
              <MenuItem value="BUS">Bus</MenuItem>
              <MenuItem value="MASJID">Masjid</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {properties.map((p) => (
          <Grid item xs={12} md={6} lg={4} key={p.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight="bold">{p.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{p.location} • {p.state}</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
                <Chip label={p.type} size="small" />
                <Chip label={p.status} size="small" color={p.status === 'ACTIVE' ? 'success' : p.status === 'UNDER_MAINTENANCE' ? 'warning' : 'default'} />
                {p.condition && <Chip label={`Condition: ${p.condition}`} size="small" />}
                {p.capacity && <Chip label={`Capacity: ${p.capacity}`} size="small" />}
              </Stack>
              {p.manager && (
                <Typography variant="body2" sx={{ mb: 1 }}>Manager: {p.manager}</Typography>
              )}
              <Typography variant="caption" color="text.secondary">Last updated: {new Date(p.lastUpdated).toLocaleDateString()}</Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button variant="outlined" size="small">View</Button>
                {(canManageAllStates || p.state === (user?.deploymentState || user?.stateCode)) && (
                  <Button variant="contained" size="small">Update</Button>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
        {!isLoading && properties.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography>No properties found.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PropertyManagementPage;


