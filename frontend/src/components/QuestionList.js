import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

const QuestionList = ({ questions }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {questions.map((question, index) => (
        <Card 
          key={index}
          sx={{ 
            backgroundColor: 'background.paper',
            '&:hover': { transform: 'scale(1.01)', transition: 'transform 0.2s' }
          }}
        >
          <CardContent>
            <Typography variant="h6" color="primary" gutterBottom>
              {question.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {question.type}
            </Typography>
            {question.blocks?.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', my: 1 }}>
                {question.blocks.map((block, idx) => (
                  <Chip 
                    key={idx}
                    label={block.text}
                    color={block.isAnswer ? "success" : "primary"}
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
            {question.solution && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Solution: {question.solution}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QuestionList;