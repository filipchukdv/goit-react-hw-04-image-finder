import axios from 'axios';
import { API_URL, KEY } from 'constants';

const fetchImages = (query, currentPage) => {
  return axios
    .get(API_URL, {
      params: {
        key: KEY,
        per_page: 12,
        page: currentPage,
        q: encodeURIComponent(query),
      },
    })
    .then(({ data }) => ({
      total_items: data.totalHits,
      items: data.hits,
    }));
};

export { fetchImages };
