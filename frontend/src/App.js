const DARK_LOGO = "/blacktheme.png";  
const LIGHT_LOGO = "/whitetheme.png";
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Pagination, 
  IconButton,
  Button,
  Link 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBox from './components/SearchBox';
import TypeFilter from './components/TypeFilter';
import QuestionList from './components/QuestionList';
import LoadingSpinner from './components/LoadingSpinner';
import NoResults from './components/NoResults';
import { searchQuestions } from './services/searchService';


function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark');
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [results, setResults] = useState([]);
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const itemsPerPage = 5;

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark' ? {
        primary: { main: '#90caf9' },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        }
      } : {
        primary: { main: '#1976d2' },
        background: {
          default: '#f5f5f5',
          paper: '#fff',
        }
      })
    }
  });

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('theme', newMode);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await searchQuestions('', 1, 500);
        setResults(response || []);
        const uniqueTypes = [...new Set(response.map(q => q.type))];
        setTypes(uniqueTypes);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setIsLoading(false);
        setInitialLoad(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    try {
      setIsLoading(true);
      const response = await searchQuestions(searchQuery, 1, 500, selectedType);
      setResults(response || []);
    } catch (err) {
      console.error('Error:', err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = async (type) => {
    setSelectedType(type);
    setPage(1);
    try {
      setIsLoading(true);
      const response = await searchQuestions(query, 1, 500, type);
      setResults(response || []);
    } catch (err) {
      console.error('Error:', err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!initialLoad && results.length === 0) {
      return <NoResults searchQuery={query} />;
    }

    return (
      <>
        <QuestionList questions={paginatedResults} searchQuery={query} />
        {results.length > itemsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Pagination
              count={Math.ceil(results.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          my: 4 
        }}>
           <Box sx={{ 
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center'
  }}>
    <img 
      src={mode === 'dark' ? DARK_LOGO : LIGHT_LOGO}
      alt="Logo"
      style={{ 
        width: '100%',
        height: 'auto',
      }} 
    />
  </Box>
          <Typography variant="h4" color="primary" sx={{ flex: 1, textAlign: 'center' }}>
            Quest
          </Typography>
          <IconButton onClick={toggleTheme} color="primary" sx={{ ml: 2 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            position: 'relative'
          }}> 
            <Box sx={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box sx={{ flex: 1 }}>
                <SearchBox value={query} onChange={handleSearch} />
              </Box>
              <Box sx={{ 
                width: '200px',
                ml: 2,
                mt: 2.7,
                display: { xs: 'none', md: 'block' }
              }}>
                <TypeFilter
                  value={selectedType}
                  onChange={handleTypeChange}
                  types={types}
                />
              </Box>
            </Box>
          </Box>
          {/* Filter for mobile */}
          <Box sx={{ 
            mt: 2,
            display: { xs: 'block', md: 'none' }
          }}>
            <TypeFilter
              value={selectedType}
              onChange={handleTypeChange}
              types={types}
            />
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1 }}>
          {renderContent()}
        </Box>

        {/* Footer */}
        <Box sx={{ 
          mt: 'auto', 
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 All rights reserved by Manoranjan
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            href="https://portfolio-build-plum.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Me
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
  