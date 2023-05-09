import axios from 'axios';
import { API_URL, KEY } from 'constants';

const fetchImages = (query, currentPage) => {
  return axios
    .get(API_URL, {
      params: {
        key: KEY,
        per_page: 15,
        page: currentPage,
        q: encodeURIComponent(query),
      },
    })
    .then(({ data }) => ({
      totalItems: data.totalHits,
      items: data.hits,
    }));
};

export { fetchImages };
