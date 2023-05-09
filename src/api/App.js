import axios from 'axios';
import { API_URL, KEY } from 'constants';

const fetchImages = (query, currentPage) => {
  return axios
    .get(API_URL, {
      params: {
        key: KEY,
        q: query,
        per_page: 15,
        page: currentPage,
      },
    })
    .then(({ data }) => ({
      totalItems: data.totalHits,
      items: data.hits,
    }));
};

export { fetchImages };
