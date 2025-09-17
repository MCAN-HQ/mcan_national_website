import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  PersonAdd,
  AdminPanelSettings,
  People,
  Security,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { User, UserRole } from '../../types';
import adminService from '../../services/adminService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Form state for creating/editing users
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'MEMBER' as UserRole,
    stateCode: '',
    deploymentState: '',
    serviceYear: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateUser = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: 'MEMBER',
      stateCode: '',
      deploymentState: '',
      serviceYear: '',
    });
    setOpenCreateDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      stateCode: user.stateCode || '',
      deploymentState: user.deploymentState || '',
      serviceYear: user.serviceYear || '',
    });
    setOpenEditDialog(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminService.deleteUser(userId);
        setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
        loadUsers();
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to delete user', severity: 'error' });
      }
    }
  };

  const handleSubmitCreate = async () => {
    try {
      await adminService.createUser(formData);
      setSnackbar({ open: true, message: 'User created successfully', severity: 'success' });
      setOpenCreateDialog(false);
      loadUsers();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create user';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleSubmitEdit = async () => {
    if (!selectedUser) return;
    
    try {
      await adminService.updateUser(selectedUser.id, formData);
      setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
      setOpenEditDialog(false);
      loadUsers();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update user';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const getRoleColor = (role: UserRole) => {
    const colors: Record<UserRole, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
      SUPER_ADMIN: 'error',
      NATIONAL_ADMIN: 'primary',
      STATE_AMEER: 'secondary',
      STATE_SECRETARY: 'info',
      MCLO_AMEER: 'warning',
      MEMBER: 'default',
    };
    return colors[role] || 'default';
  };

  const getRoleLabel = (role: UserRole) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await adminService.getAllUsers();
      setUsers(usersData);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to load users';
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Check if current user is SUPER_ADMIN
  if (user?.role !== 'SUPER_ADMIN') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Access denied. Only SUPER_ADMIN can access this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.dark', mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users, roles, and system settings
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<People />} label="User Management" />
          <Tab icon={<Security />} label="Role Management" />
          <Tab icon={<DashboardIcon />} label="System Overview" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Users ({users.length})</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleCreateUser}
            sx={{ borderRadius: 2 }}
          >
            Create User
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {user.fullName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={getRoleLabel(user.role)}
                      color={getRoleColor(user.role)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.deploymentState || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? 'Active' : 'Inactive'}
                      color={user.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleEditUser(user)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Role Management
        </Typography>
        <Grid container spacing={3}>
          {[
            { role: 'SUPER_ADMIN', description: 'Full system access and control', color: 'error' },
            { role: 'NATIONAL_ADMIN', description: 'National-level management and oversight', color: 'primary' },
            { role: 'STATE_AMEER', description: 'State chapter leadership and management', color: 'secondary' },
            { role: 'STATE_SECRETARY', description: 'State administrative functions', color: 'info' },
            { role: 'MCLO_AMEER', description: 'Local chapter leadership', color: 'warning' },
            { role: 'MEMBER', description: 'Standard corps member access', color: 'default' },
          ].map((roleInfo) => (
            <Grid item xs={12} md={6} key={roleInfo.role}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AdminPanelSettings sx={{ mr: 2, color: `${roleInfo.color}.main` }} />
                    <Typography variant="h6" fontWeight="bold">
                      {getRoleLabel(roleInfo.role as UserRole)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {roleInfo.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          System Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                  {users.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 'bold' }}>
                  {users.filter(u => u.isActive).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="info.main" sx={{ fontWeight: 'bold' }}>
                  {users.filter(u => u.role.startsWith('STATE')).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  State Admins
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="warning.main" sx={{ fontWeight: 'bold' }}>
                  {users.filter(u => u.role === 'MEMBER').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Create User Dialog */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                >
                  <MenuItem value="MEMBER">Member</MenuItem>
                  <MenuItem value="MCLO_AMEER">MCLO Ameer</MenuItem>
                  <MenuItem value="STATE_SECRETARY">State Secretary</MenuItem>
                  <MenuItem value="STATE_AMEER">State Ameer</MenuItem>
                  <MenuItem value="NATIONAL_ADMIN">National Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State Code"
                value={formData.stateCode}
                onChange={(e) => setFormData({ ...formData, stateCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Deployment State"
                value={formData.deploymentState}
                onChange={(e) => setFormData({ ...formData, deploymentState: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Service Year"
                value={formData.serviceYear}
                onChange={(e) => setFormData({ ...formData, serviceYear: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitCreate} variant="contained">
            Create User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                >
                  <MenuItem value="MEMBER">Member</MenuItem>
                  <MenuItem value="MCLO_AMEER">MCLO Ameer</MenuItem>
                  <MenuItem value="STATE_SECRETARY">State Secretary</MenuItem>
                  <MenuItem value="STATE_AMEER">State Ameer</MenuItem>
                  <MenuItem value="NATIONAL_ADMIN">National Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State Code"
                value={formData.stateCode}
                onChange={(e) => setFormData({ ...formData, stateCode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Deployment State"
                value={formData.deploymentState}
                onChange={(e) => setFormData({ ...formData, deploymentState: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Service Year"
                value={formData.serviceYear}
                onChange={(e) => setFormData({ ...formData, serviceYear: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitEdit} variant="contained">
            Update User
          </Button>
        </DialogActions>
      </Dialog>

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

export default AdminDashboard;
