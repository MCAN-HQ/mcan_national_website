import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface DashboardChartProps {
  title: string;
  data: ChartData[];
  type: 'bar' | 'line' | 'pie';
  height?: number;
  showToggle?: boolean;
  onToggleChange?: (value: string) => void;
}

const COLORS = ['#2E7D32', '#4CAF50', '#81C784', '#FFC107', '#FF9800', '#FF5722'];

const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  data,
  type,
  height = 300,
  showToggle = false,
  onToggleChange,
}) => {
  const [chartType, setChartType] = React.useState(type);

  const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newType: string) => {
    if (newType !== null) {
      setChartType(newType as 'bar' | 'line' | 'pie');
      onToggleChange?.(newType);
    }
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2E7D32" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2E7D32" 
                strokeWidth={3}
                dot={{ fill: '#2E7D32', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
            
            {showToggle && (
              <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={handleToggleChange}
                size="small"
              >
                <ToggleButton value="bar">Bar</ToggleButton>
                <ToggleButton value="line">Line</ToggleButton>
                <ToggleButton value="pie">Pie</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>
          
          <Box sx={{ width: '100%', height: height }}>
            {renderChart()}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardChart;
