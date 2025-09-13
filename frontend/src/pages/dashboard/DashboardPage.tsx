import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import StatsCard from '../../components/dashboard/StatsCard';
import DashboardChart from '../../components/dashboard/DashboardChart';
import PrayerTimes from '../../components/prayer/PrayerTimes';
import {
  People,
  Business,
  Payment,
  TrendingUp,
  School,
} from '@mui/icons-material';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const role = user?.role || 'MEMBER';

  // Mock data for charts and stats
  const memberStats = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1350 },
    { name: 'Mar', value: 1500 },
    { name: 'Apr', value: 1650 },
    { name: 'May', value: 1800 },
    { name: 'Jun', value: 1950 },
  ];

  const paymentData = [
    { name: 'Paid', value: 85, color: '#4CAF50' },
    { name: 'Pending', value: 10, color: '#FF9800' },
    { name: 'Overdue', value: 5, color: '#F44336' },
  ];

  const stateDistribution = [
    { name: 'Lagos', value: 2500 },
    { name: 'Kano', value: 1800 },
    { name: 'Abuja', value: 1200 },
    { name: 'Kaduna', value: 900 },
    { name: 'Rivers', value: 800 },
    { name: 'Others', value: 2000 },
  ];

  const getStatsForRole = () => {
    switch (role) {
      case 'SUPER_ADMIN':
        return [
          {
            title: 'Total Members',
            value: '15,000+',
            subtitle: 'Across all states',
            icon: <People />,
            color: '#4CAF50',
            trend: { value: 12, isPositive: true },
          },
          {
            title: 'Active Properties',
            value: '200+',
            subtitle: 'MCAN properties',
            icon: <Business />,
            color: '#2196F3',
            trend: { value: 8, isPositive: true },
          },
          {
            title: 'Monthly Revenue',
            value: '₦2.5M',
            subtitle: 'This month',
            icon: <Payment />,
            color: '#FF9800',
            trend: { value: 15, isPositive: true },
          },
          {
            title: 'Growth Rate',
            value: '12%',
            subtitle: 'Member growth',
            icon: <TrendingUp />,
            color: '#9C27B0',
            trend: { value: 5, isPositive: true },
          },
        ];
      case 'STATE_AMEER':
        return [
          {
            title: 'State Members',
            value: '1,200',
            subtitle: 'Active members',
            icon: <People />,
            color: '#4CAF50',
            trend: { value: 8, isPositive: true },
          },
          {
            title: 'Properties',
            value: '15',
            subtitle: 'State properties',
            icon: <Business />,
            color: '#2196F3',
            trend: { value: 2, isPositive: true },
          },
          {
            title: 'Monthly Dues',
            value: '₦180K',
            subtitle: 'Collected this month',
            icon: <Payment />,
            color: '#FF9800',
            progress: 85,
          },
        ];
      default:
        return [
          {
            title: 'My Profile',
            value: 'Complete',
            subtitle: 'Profile status',
            icon: <People />,
            color: '#4CAF50',
            chip: { label: 'Active', color: 'success' as const },
          },
          {
            title: 'Membership',
            value: 'Active',
            subtitle: 'MCAN membership',
            icon: <School />,
            color: '#2196F3',
            chip: { label: 'Current', color: 'primary' as const },
          },
          {
            title: 'Payments',
            value: 'Up to date',
            subtitle: 'Payment status',
            icon: <Payment />,
            color: '#4CAF50',
            chip: { label: 'Paid', color: 'success' as const },
          },
        ];
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Chip label={role.replace('_', ' ')} color="success" />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {getStatsForRole().map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Charts and Additional Content */}
      <Grid container spacing={3}>
        {/* Member Growth Chart */}
        <Grid item xs={12} lg={8}>
          <DashboardChart
            title="Member Growth"
            data={memberStats}
            type="line"
            showToggle={true}
          />
        </Grid>

        {/* Prayer Times */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Prayer Times
              </Typography>
              <PrayerTimes />
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Status Chart */}
        <Grid item xs={12} md={6}>
          <DashboardChart
            title="Payment Status"
            data={paymentData}
            type="pie"
          />
        </Grid>

        {/* State Distribution */}
        <Grid item xs={12} md={6}>
          <DashboardChart
            title="Member Distribution by State"
            data={stateDistribution}
            type="bar"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
