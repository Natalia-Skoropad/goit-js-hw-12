import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51833962-a1f170a3ab3673d4610a8ef06';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page,
  };
  const { data } = await axios.get(BASE_URL, { params });
  return data;
}
