import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search,
  Clear,
  Person,
  Business,
  LocationOn,
  Payment,
  School,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'member' | 'property' | 'payment' | 'service' | 'page';
  url: string;
  icon: React.ReactNode;
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch,
  placeholder = "Search members, properties, payments..." 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock search results - in real app, this would come from an API
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Aisha Ibrahim',
      description: 'Corps Member - Lagos State',
      type: 'member',
      url: '/members/aisha-ibrahim',
      icon: <Person />,
    },
    {
      id: '2',
      title: 'MCAN Lagos Property',
      description: 'Lagos State Chapter Office',
      type: 'property',
      url: '/properties/lagos-office',
      icon: <Business />,
    },
    {
      id: '3',
      title: 'Monthly Dues Payment',
      description: 'Payment for January 2024',
      type: 'payment',
      url: '/payments/monthly-dues',
      icon: <Payment />,
    },
    {
      id: '4',
      title: 'Islamic Education Program',
      description: 'Weekly Islamic classes',
      type: 'service',
      url: '/services/islamic-education',
      icon: <School />,
    },
    {
      id: '5',
      title: 'Prayer Times',
      description: 'Daily prayer schedule',
      type: 'page',
      url: '/prayer-times',
      icon: <LocationOn />,
    },
  ];

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filteredResults = mockResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
        setLoading(false);
      }, 300);
    } else {
      setResults([]);
    }
  }, [query, mockResults]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setShowResults(true);
    onSearch?.(searchQuery);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result: SearchResult) => {
    // In real app, navigate to the result URL
    console.log('Navigate to:', result.url);
    setShowResults(false);
    setQuery('');
  };

  const getTypeColor = (type: string) => {
    const colors = {
      member: 'primary',
      property: 'secondary',
      payment: 'success',
      service: 'warning',
      page: 'info',
    };
    return colors[type as keyof typeof colors] || 'default';
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
      <TextField
        fullWidth
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowResults(true)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 25,
            backgroundColor: 'background.paper',
          },
        }}
      />

      <AnimatePresence>
        {showResults && (query.length > 2 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Paper
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                mt: 1,
                maxHeight: 400,
                overflow: 'auto',
                zIndex: 1000,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              {loading ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Searching...
                  </Typography>
                </Box>
              ) : results.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {results.map((result, index) => (
                    <React.Fragment key={result.id}>
                      <ListItem
                        button
                        onClick={() => handleResultClick(result)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                          {result.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={result.title}
                          secondary={result.description}
                        />
                        <Chip
                          label={result.type}
                          size="small"
                          color={getTypeColor(result.type) as any}
                          variant="outlined"
                        />
                      </ListItem>
                      {index < results.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : query.length > 2 ? (
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    No results found for "{query}"
                  </Typography>
                </Box>
              ) : null}
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SearchBar;
