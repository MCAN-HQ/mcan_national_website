import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Divider,
  Paper,
} from '@mui/material';
import {
  MenuBook,
  School,
  PlayArrow,
  Download,
  Share,
  Favorite,
  Bookmark,
  Search,
  FilterList,
  Close,
  VolumeUp,
  Translate,
  Lightbulb,
  History,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface IslamicResource {
  id: string;
  title: string;
  type: 'quran' | 'hadith' | 'education' | 'audio' | 'video';
  description: string;
  author?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  category: string;
  rating: number;
  downloads: number;
  isBookmarked: boolean;
  isFavorite: boolean;
  url: string;
  thumbnail?: string;
}

const IslamicResources: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedResource, setSelectedResource] = useState<IslamicResource | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const resources: IslamicResource[] = [
    {
      id: '1',
      title: 'Quran with Translation',
      type: 'quran',
      description: 'Complete Quran with Arabic text, English translation, and transliteration',
      author: 'Various Scholars',
      difficulty: 'beginner',
      language: 'Arabic/English',
      category: 'Quran',
      rating: 4.9,
      downloads: 15420,
      isBookmarked: false,
      isFavorite: true,
      url: '/quran',
    },
    {
      id: '2',
      title: 'Sahih Bukhari Collection',
      type: 'hadith',
      description: 'Complete collection of authentic hadiths from Sahih Bukhari',
      author: 'Imam Bukhari',
      difficulty: 'intermediate',
      language: 'Arabic/English',
      category: 'Hadith',
      rating: 4.8,
      downloads: 8930,
      isBookmarked: true,
      isFavorite: false,
      url: '/hadith/bukhari',
    },
    {
      id: '3',
      title: 'Islamic History Series',
      type: 'education',
      description: 'Comprehensive series on Islamic history from the Prophet to modern times',
      author: 'Dr. Ahmad Hassan',
      duration: '12 hours',
      difficulty: 'intermediate',
      language: 'English',
      category: 'History',
      rating: 4.7,
      downloads: 5670,
      isBookmarked: false,
      isFavorite: true,
      url: '/history',
    },
    {
      id: '4',
      title: 'Quran Recitation - Mishary Rashid',
      type: 'audio',
      description: 'Beautiful Quran recitation with proper tajweed rules',
      author: 'Mishary Rashid Alafasy',
      duration: '2.5 hours',
      difficulty: 'beginner',
      language: 'Arabic',
      category: 'Audio',
      rating: 4.9,
      downloads: 23450,
      isBookmarked: true,
      isFavorite: true,
      url: '/audio/mishary',
    },
    {
      id: '5',
      title: 'Fiqh Fundamentals',
      type: 'education',
      description: 'Understanding Islamic jurisprudence and its principles',
      author: 'Sheikh Abdullah Yusuf',
      duration: '8 hours',
      difficulty: 'advanced',
      language: 'English',
      category: 'Fiqh',
      rating: 4.6,
      downloads: 3450,
      isBookmarked: false,
      isFavorite: false,
      url: '/fiqh',
    },
    {
      id: '6',
      title: 'Daily Duas Collection',
      type: 'education',
      description: 'Essential daily prayers and supplications with meanings',
      author: 'Various Scholars',
      difficulty: 'beginner',
      language: 'Arabic/English',
      category: 'Duas',
      rating: 4.8,
      downloads: 12890,
      isBookmarked: true,
      isFavorite: true,
      url: '/duas',
    },
  ];

  const categories = ['all', 'Quran', 'Hadith', 'History', 'Fiqh', 'Duas', 'Audio', 'Video'];
  const types = ['quran', 'hadith', 'education', 'audio', 'video'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quran': return <MenuBook />;
      case 'hadith': return <Bookmark />;
      case 'education': return <School />;
      case 'audio': return <VolumeUp />;
      case 'video': return <PlayArrow />;
      default: return <MenuBook />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quran': return '#4CAF50';
      case 'hadith': return '#2196F3';
      case 'education': return '#FF9800';
      case 'audio': return '#9C27B0';
      case 'video': return '#F44336';
      default: return '#757575';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleResourceClick = (resource: IslamicResource) => {
    setSelectedResource(resource);
    setDialogOpen(true);
  };

  const handleBookmark = (resourceId: string) => {
    // Toggle bookmark logic would go here
    console.log('Bookmark toggled for:', resourceId);
  };

  const handleFavorite = (resourceId: string) => {
    // Toggle favorite logic would go here
    console.log('Favorite toggled for:', resourceId);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'primary.dark' }}>
          Islamic Resources
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Explore our comprehensive collection of Islamic educational materials
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search Islamic resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setFilterCategory(category)}
                  color={filterCategory === category ? 'primary' : 'default'}
                  variant={filterCategory === category ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Resources Grid */}
      <Grid container spacing={3}>
        {filteredResources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                }}
                onClick={() => handleResourceClick(resource)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: getTypeColor(resource.type),
                        mr: 2,
                      }}
                    >
                      {getTypeIcon(resource.type)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                        {resource.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {resource.author}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Bookmark">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(resource.id);
                          }}
                        >
                          <Bookmark color={resource.isBookmarked ? 'primary' : 'action'} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Favorite">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFavorite(resource.id);
                          }}
                        >
                          <Favorite color={resource.isFavorite ? 'error' : 'action'} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {resource.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip
                      label={resource.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      label={resource.difficulty}
                      size="small"
                      color={getDifficultyColor(resource.difficulty) as any}
                    />
                    <Chip
                      label={resource.language}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Star sx={{ color: '#FFD700', fontSize: 16 }} />
                      <Typography variant="body2" color="text.secondary">
                        {resource.rating}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ({resource.downloads.toLocaleString()} downloads)
                      </Typography>
                    </Box>
                    {resource.duration && (
                      <Chip
                        label={resource.duration}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Resource Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: getTypeColor(selectedResource?.type || '') }}>
              {selectedResource && getTypeIcon(selectedResource.type)}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {selectedResource?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {selectedResource?.author}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setDialogOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {selectedResource && (
            <Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedResource.description}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.light', borderRadius: 2 }}>
                    <Typography variant="h4" fontWeight="bold" color="primary.dark">
                      {selectedResource.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'secondary.light', borderRadius: 2 }}>
                    <Typography variant="h4" fontWeight="bold" color="secondary.dark">
                      {selectedResource.downloads.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Downloads
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                <Chip label={selectedResource.category} color="primary" />
                <Chip label={selectedResource.difficulty} color={getDifficultyColor(selectedResource.difficulty) as any} />
                <Chip label={selectedResource.language} variant="outlined" />
                {selectedResource.duration && (
                  <Chip label={selectedResource.duration} variant="outlined" />
                )}
              </Box>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<Download />}
            href={selectedResource?.url}
            target="_blank"
          >
            Access Resource
          </Button>
          <Button
            variant="outlined"
            startIcon={<Share />}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IslamicResources;
