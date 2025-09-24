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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { 
  Search, 
  Place, 
  Category, 
  Visibility, 
  Edit, 
  Delete, 
  Phone,
  Email,
  Info
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { propertyService } from '../../services/propertyService';
import { PropertyItem } from '../../data/mockProperties';

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
  const [selectedProperty, setSelectedProperty] = useState<PropertyItem | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newProperty, setNewProperty] = useState<Partial<PropertyItem>>({
    name: '',
    type: 'LODGE',
    state: '',
    location: '',
    status: 'ACTIVE',
    ownership: 'MCAN',
    condition: 'GOOD'
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const canManageAllStates = user?.role === 'SUPER_ADMIN' || user?.role === 'NATIONAL_ADMIN';
  const canManageProperties = canManageAllStates || user?.role === 'STATE_AMEER' || user?.role === 'STATE_SECRETARY';
  
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

  const handleViewProperty = (property: PropertyItem) => {
    setSelectedProperty(property);
    setViewDialogOpen(true);
  };

  const handleEditProperty = (property: PropertyItem) => {
    setSelectedProperty(property);
    setEditDialogOpen(true);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await propertyService.delete(propertyId);
        setProperties(properties.filter(p => p.id !== propertyId));
        setSnackbar({
          open: true,
          message: 'Property deleted successfully',
          severity: 'success'
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to delete property',
          severity: 'error'
        });
      }
    }
  };

  const handleCloseDialogs = () => {
    setViewDialogOpen(false);
    setEditDialogOpen(false);
    setSelectedProperty(null);
  };

  // keep single definition above

  const openCreateDialog = () => {
    const userState = user?.deploymentState || user?.stateCode || '';
    setNewProperty({
      name: '',
      type: 'LODGE',
      state: canManageAllStates ? '' : userState,
      location: '',
      status: 'ACTIVE',
      ownership: 'MCAN',
      condition: 'GOOD'
    });
    setCreateDialogOpen(true);
  };

  const handleCreateProperty = async () => {
    try {
      setCreating(true);
      const payload: Omit<PropertyItem, 'id' | 'lastUpdated'> = {
        name: newProperty.name || '',
        type: (newProperty.type as PropertyItem['type']) || 'LODGE',
        state: canManageAllStates ? (newProperty.state || '') : (user?.deploymentState || user?.stateCode || ''),
        location: newProperty.location || '',
        status: (newProperty.status as PropertyItem['status']) || 'ACTIVE',
        ownership: (newProperty.ownership as PropertyItem['ownership']) || 'MCAN',
        capacity: newProperty.capacity,
        condition: newProperty.condition,
        manager: newProperty.manager,
        description: newProperty.description,
        amenities: newProperty.amenities,
        contactInfo: newProperty.contactInfo as any,
        // lastUpdated will be set by service fallback; backend should set server-side
      } as any;

      if (!payload.name || !payload.location || !payload.state) {
        setSnackbar({ open: true, message: 'Please fill in name, location and state.', severity: 'error' });
        setCreating(false);
        return;
      }

      const created = await propertyService.create(payload as any);
      setProperties([created, ...properties]);
      setSnackbar({ open: true, message: 'Property added successfully', severity: 'success' });
      setCreateDialogOpen(false);
    } catch (e) {
      setSnackbar({ open: true, message: 'Failed to add property', severity: 'error' });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h3" sx={{ color: 'primary.dark' }}>
          Property Management
        </Typography>
        {canManageProperties && (
          <Button variant="contained" onClick={openCreateDialog}>
            Add Property
          </Button>
        )}
      </Box>

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
            <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{p.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{p.location} • {p.state}</Typography>
              
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 1 }}>
                <Chip label={p.type} size="small" />
                <Chip 
                  label={p.status} 
                  size="small" 
                  color={p.status === 'ACTIVE' ? 'success' : p.status === 'UNDER_MAINTENANCE' ? 'warning' : 'default'} 
                />
                {p.condition && (
                  <Chip 
                    label={p.condition} 
                    size="small" 
                    color={p.condition === 'EXCELLENT' ? 'success' : p.condition === 'GOOD' ? 'primary' : p.condition === 'FAIR' ? 'warning' : 'error'}
                  />
                )}
                {p.capacity && <Chip label={`${p.capacity} capacity`} size="small" />}
              </Stack>
              
              {p.manager && (
                <Typography variant="body2" sx={{ mb: 1 }}>Manager: {p.manager}</Typography>
              )}
              
              <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                Last updated: {new Date(p.lastUpdated).toLocaleDateString()}
              </Typography>
              
              <Box sx={{ mt: 'auto', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Tooltip title="View Details">
                  <IconButton 
                    size="small" 
                    onClick={() => handleViewProperty(p)}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                </Tooltip>
                
                {canManageProperties && (canManageAllStates || p.state === (user?.deploymentState || user?.stateCode)) && (
                  <>
                    <Tooltip title="Edit Property">
                      <IconButton 
                        size="small" 
                        onClick={() => handleEditProperty(p)}
                        color="secondary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete Property">
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteProperty(p.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
        
        {!isLoading && properties.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No properties found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or add new properties.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* View Property Dialog */}
      <Dialog open={viewDialogOpen} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info color="primary" />
            Property Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedProperty && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                {selectedProperty.name}
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{selectedProperty.location}, {selectedProperty.state}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Type</Typography>
                  <Typography variant="body1">{selectedProperty.type}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={selectedProperty.status} 
                    color={selectedProperty.status === 'ACTIVE' ? 'success' : selectedProperty.status === 'UNDER_MAINTENANCE' ? 'warning' : 'default'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">Condition</Typography>
                  <Chip 
                    label={selectedProperty.condition || 'N/A'} 
                    color={selectedProperty.condition === 'EXCELLENT' ? 'success' : selectedProperty.condition === 'GOOD' ? 'primary' : selectedProperty.condition === 'FAIR' ? 'warning' : 'error'}
                    size="small"
                  />
                </Grid>
                {selectedProperty.capacity && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Capacity</Typography>
                    <Typography variant="body1">{selectedProperty.capacity} people</Typography>
                  </Grid>
                )}
                {selectedProperty.manager && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Manager</Typography>
                    <Typography variant="body1">{selectedProperty.manager}</Typography>
                  </Grid>
                )}
              </Grid>

              {selectedProperty.description && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">Description</Typography>
                  <Typography variant="body1">{selectedProperty.description}</Typography>
                </Box>
              )}

              {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Amenities</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {selectedProperty.amenities.map((amenity: string, index: number) => (
                      <Chip key={index} label={amenity} size="small" />
                    ))}
                  </Stack>
                </Box>
              )}

              {selectedProperty.contactInfo && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Contact Information</Typography>
                  <Stack spacing={1}>
                    {selectedProperty.contactInfo.phone && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone fontSize="small" />
                        <Typography variant="body2">{selectedProperty.contactInfo.phone}</Typography>
                      </Box>
                    )}
                    {selectedProperty.contactInfo.email && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" />
                        <Typography variant="body2">{selectedProperty.contactInfo.email}</Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>
              )}

              <Typography variant="caption" color="text.secondary">
                Last updated: {new Date(selectedProperty.lastUpdated).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Close</Button>
          {canManageProperties && selectedProperty && (canManageAllStates || selectedProperty.state === (user?.deploymentState || user?.stateCode)) && (
            <Button 
              variant="contained" 
              startIcon={<Edit />}
              onClick={() => {
                setViewDialogOpen(false);
                setEditDialogOpen(true);
              }}
            >
              Edit Property
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Create Property Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Property</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={newProperty.name || ''}
                onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Type"
                fullWidth
                value={newProperty.type || 'LODGE'}
                onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value as PropertyItem['type'] })}
              >
                {['LODGE','BUS','MASJID','OTHER'].map((t) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="State"
                fullWidth
                disabled={!canManageAllStates}
                value={newProperty.state || ''}
                onChange={(e) => setNewProperty({ ...newProperty, state: e.target.value })}
              >
                {NIGERIAN_STATES.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                value={newProperty.location || ''}
                onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Status"
                fullWidth
                value={newProperty.status || 'ACTIVE'}
                onChange={(e) => setNewProperty({ ...newProperty, status: e.target.value as PropertyItem['status'] })}
              >
                {['ACTIVE','UNDER_MAINTENANCE','UNAVAILABLE'].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Ownership"
                fullWidth
                value={newProperty.ownership || 'MCAN'}
                onChange={(e) => setNewProperty({ ...newProperty, ownership: e.target.value as PropertyItem['ownership'] })}
              >
                {['MCAN','LEASED','DONATED'].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)} disabled={creating}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateProperty} disabled={creating}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Property Dialog - Placeholder for now */}
      <Dialog open={editDialogOpen} onClose={handleCloseDialogs} maxWidth="md" fullWidth>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          <Typography>Property editing functionality will be implemented here.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PropertyManagementPage;


