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
      setResults(Array.isArray(response) ? response : [response]);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const paginatedResults = results;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" sx={{ textAlign: 'center', my: 4, color: 'primary.main' }}>
          Quest Search
        </Typography>
        <SearchBox value={query} onChange={handleSearch} />
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
      </Container>
    </ThemeProvider>
  );
}

export default App;