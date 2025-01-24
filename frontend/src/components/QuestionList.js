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
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Type: {question.type}
            </Typography>
            {question.options?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Options:</Typography>
                {question.options.map((option, idx) => (
                  <Chip 
                    key={idx}
                    label={option.text}
                    color={option.isCorrectAnswer ? "success" : "default"}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            )}
            {question.blocks?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Blocks:</Typography>
                {question.blocks.map((block, idx) => (
                  <Chip 
                    key={idx}
                    label={block.text}
                    color={block.isAnswer ? "primary" : "default"}
                    variant={block.showInOption ? "outlined" : "filled"}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            )}
            {question.solution && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="textSecondary">Solution:</Typography>
                <Typography variant="body2">{question.solution}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QuestionList;