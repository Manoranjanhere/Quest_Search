import React, { useState } from 'react';
import { Container, Typography, Box, Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchBox from './components/SearchBox';
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
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await searchQuestions(searchQuery);
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
        <SearchBox value={query} onChange={handleSearch} />
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