import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Dashboard,
  Logout,
  Settings,
  Home,
  Info,
  People,
  Business,
  LocationOn,
  ContactMail,
  AccessTime,
} from '@mui/icons-material';
import mcanLogo from '../../assets/mcanlogo.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import NotificationBell from '../notifications/NotificationBell';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    handleMenuClose();
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'About', path: '/about', icon: <Info /> },
    { label: 'Membership', path: '/membership', icon: <People /> },
    { label: 'Services', path: '/services', icon: <Business /> },
    { label: 'States', path: '/states', icon: <LocationOn /> },
    { label: 'Prayer Times', path: '/prayer-times', icon: <AccessTime /> },
    { label: 'Contact', path: '/contact', icon: <ContactMail /> },
  ];

  const userMenuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Profile', path: '/profile', icon: <AccountCircle /> },
    { label: 'Settings', path: '/settings', icon: <Settings /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
        <Box
          component="img"
          src={mcanLogo}
          alt="MCAN Logo"
          sx={{
            height: 50,
            width: 'auto',
            mb: 1,
            borderRadius: 1,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        />
        <Typography variant="h6" color="primary" fontWeight="bold">
          MCAN
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Muslim Corpers Association of Nigeria
        </Typography>
      </Box>
      
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.path}
            button
            onClick={() => handleNavigation(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(46, 125, 50, 0.1)',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        
        {isAuthenticated && (
          <>
            <ListItem sx={{ mt: 2, borderTop: '1px solid #e0e0e0' }}>
              <ListItemText 
                primary="Account" 
                primaryTypographyProps={{ 
                  variant: 'subtitle2', 
                  color: 'text.secondary',
                  fontWeight: 'bold'
                }} 
              />
            </ListItem>
            {userMenuItems.map((item) => (
              <ListItem
                key={item.path}
                button
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: 4,
            }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src={mcanLogo}
              alt="MCAN Logo"
              sx={{
                height: 40,
                width: 'auto',
                mr: 2,
                borderRadius: 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            />
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  lineHeight: 1,
                }}
              >
                MCAN
              </Typography>
              {!isMobile && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.7rem',
                    lineHeight: 1,
                  }}
                >
                  Muslim Corpers Association of Nigeria
                </Typography>
              )}
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    color: location.pathname === item.path ? '#FFD54F' : 'white',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, maxWidth: 400, mx: 2 }}>
              <SearchBar />
            </Box>
          )}

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DarkModeToggle />
            {isAuthenticated && <NotificationBell />}
            {isAuthenticated ? (
              <>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" color="inherit">
                    Welcome, {user?.fullName}
                  </Typography>
                  <Typography variant="caption" color="rgba(255,255,255,0.7)">
                    {user?.role?.replace('_', ' ')}
                  </Typography>
                </Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'secondary.main',
                      color: 'white',
                    }}
                  >
                    {user?.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {userMenuItems.map((item) => (
                    <MenuItem
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {item.label}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{
                    border: '1px solid rgba(255,255,255,0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/register')}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  Join MCAN
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleMobileToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
