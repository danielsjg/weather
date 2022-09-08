// Libraries
import axios from 'axios';

// DotEnv
import { API_BASE_URL } from '@env';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
