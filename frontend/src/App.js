import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchBox from './components/SearchBox';
import TypeFilter from './components/TypeFilter';
import QuestionList from './components/QuestionList';
import { searchQuestions } from './services/searchService';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [results, setResults] = useState([]);
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  // Load all questions on initial render
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await searchQuestions('', 1, 500);
        setResults(response || []);
        // Extract unique types
        const uniqueTypes = [...new Set(response.map(q => q.type))];
        setTypes(uniqueTypes);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
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

  // Calculate start and end index for current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
      <Typography variant="h4" sx={{ textAlign: 'center', my: 4, color: 'primary.main' }}>
        Quest Search
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2, 
        mb: 4 
      }}>
        <Box sx={{ width: '100%' }}>
          <SearchBox value={query} onChange={handleSearch} />
        </Box>
        <Box sx={{ 
          width: { xs: '100%', sm: '200px' },
          mt: { xs: -2, sm: 2.5 } // Align with search bar
        }}>
          <TypeFilter
            value={selectedType}
            onChange={handleTypeChange}
            types={types}
          />
          </Box>
        </Box>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <QuestionList questions={paginatedResults} />
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
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;