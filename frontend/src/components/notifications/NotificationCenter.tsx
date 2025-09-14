import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Button,
  Drawer,
  AppBar,
  Toolbar,
  IconButton as MuiIconButton,
} from '@mui/material';
import {
  Notifications,
  Close,
  CheckCircle,
  Warning,
  Info,
  Error,
  MarkAsUnread,
  Delete,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ open, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications - in real app, this would come from an API
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Payment Received',
      message: 'Your monthly dues payment of ₦5,000 has been processed successfully.',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionUrl: '/payments',
    },
    {
      id: '2',
      title: 'Prayer Time Reminder',
      message: 'Dhuhr prayer time is in 15 minutes.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      actionUrl: '/prayer-times',
    },
    {
      id: '3',
      title: 'Profile Update Required',
      message: 'Please update your contact information in your profile.',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      actionUrl: '/profile',
    },
    {
      id: '4',
      title: 'New Member Welcome',
      message: 'Aisha Ibrahim has joined your state chapter.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: '5',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM.',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
    },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setUnreadCount(prev => {
      const notification = notifications.find(n => n.id === id);
      return notification && !notification.read ? Math.max(0, prev - 1) : prev;
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      // In real app, navigate to the URL
      console.log('Navigate to:', notification.actionUrl);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          maxWidth: '90vw',
        },
      }}
    >
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
            {unreadCount > 0 && (
              <Chip
                label={unreadCount}
                size="small"
                color="secondary"
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
          <MuiIconButton color="inherit" onClick={onClose}>
            <Close />
          </MuiIconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {unreadCount > 0 && (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<MarkAsUnread />}
              onClick={handleMarkAllAsRead}
              fullWidth
            >
              Mark All as Read
            </Button>
          </Box>
        )}

        <List sx={{ p: 0 }}>
          <AnimatePresence>
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: notification.read ? 'transparent' : 'action.hover',
                    border: notification.read ? 'none' : '1px solid',
                    borderColor: `${getNotificationColor(notification.type)}.main`,
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                >
                  <ListItemIcon>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={notification.read ? 'normal' : 'bold'}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
              </motion.div>
            ))}
          </AnimatePresence>
        </List>

        {notifications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Notifications sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You're all caught up!
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default NotificationCenter;
