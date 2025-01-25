import { SearchRequest } from './search_pb';
import { SearchServiceClient } from './search_grpc_web_pb';

const client = new SearchServiceClient('http://localhost:8080');

export const searchQuestions = async (query, page = 1, limit = 500, type = '') => {
  return new Promise((resolve, reject) => {
    const request = new SearchRequest();
    request.setQuery(query);
    request.setPage(page);
    request.setLimit(limit);
    request.setType(type);

    client.search(request, {}, (err, response) => {
      if (err) {
        console.error('Search error:', err);
        reject(err);
        return;
      }

      try {
        const results = response.getQuestionsList().map(question => ({
          title: question.getTitle() || '',
          type: question.getType() || '',
          options: (question.getOptionsList() || []).map(opt => ({
            text: opt.getText() || '',
            isCorrectAnswer: opt.getIscorrectanswer() || false
          })),
          solution: question.getSolution() || '',
          blocks: (question.getBlocksList() || []).map(block => ({
            text: block.getText() || '',
            showInOption: block.getShowinoption() || false,
            isAnswer: block.getIsanswer() || false
          }))
        }));
        resolve(results);
      } catch (error) {
        console.error('Error parsing response:', error);
        reject(error);
      }
    });
  });
};