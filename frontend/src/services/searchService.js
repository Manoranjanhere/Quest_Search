import { SearchRequest } from './search_pb';
import { SearchServiceClient } from './search_grpc_web_pb';

const client = new SearchServiceClient('http://localhost:8080');

export const searchQuestions = async (query, page = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    const request = new SearchRequest();
    request.setQuery(query);
    request.setPage(page);
    request.setLimit(limit);

    client.search(request, {}, (err, response) => {
      if (err) {
        console.error('Search error:', err);
        reject(err);
        return;
      }

      try {
        const result = {
          title: response.getTitle() || '',
          type: response.getType() || '',
          options: (response.getOptionsList() || []).map(opt => ({
            text: opt.getText() || '',
          })),
          solution: response.getSolution() || '',
          blocks: (response.getBlocksList() || []).map(block => ({
            text: block.getText() || '',
            showInOption: block.getShowInOption() || false,
            isAnswer: block.getIsAnswer() || false
          }))
        };
        resolve(result);
      } catch (error) {
        console.error('Error parsing response:', error);
        reject(error);
      }
    });
  });
};