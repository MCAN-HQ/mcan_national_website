import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
  chip?: {
    label: string;
    color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
  progress,
  chip,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'visible',
          '&:hover': {
            boxShadow: `0 8px 25px ${color}30`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {value}
              </Typography>
              {subtitle && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            
            <Avatar
              sx={{
                backgroundColor: color,
                width: 56,
                height: 56,
              }}
            >
              {icon}
            </Avatar>
          </Box>

          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="body2"
                color={trend.isPositive ? 'success.main' : 'error.main'}
                sx={{ fontWeight: 'bold' }}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                vs last month
              </Typography>
            </Box>
          )}

          {progress !== undefined && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: `${color}20`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: color,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          )}

          {chip && (
            <Chip
              label={chip.label}
              color={chip.color}
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
