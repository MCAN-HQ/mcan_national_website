import React, { useState } from 'react';
import { IconButton, Badge, Tooltip } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import NotificationCenter from './NotificationCenter';

const NotificationBell: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [unreadCount] = useState(3); // Mock unread count

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleOpen}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="secondary"
            max={99}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                height: 18,
                minWidth: 18,
              },
            }}
          >
            <Notifications />
          </Badge>
        </IconButton>
      </Tooltip>

      <NotificationCenter open={open} onClose={handleClose} />
    </>
  );
};

export default NotificationBell;
