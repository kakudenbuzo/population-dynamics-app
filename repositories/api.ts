import axios from 'axios';

const baseURL = process.env.HOST_NAME + '/server-api';

const api = axios.create({
  baseURL,
});

export default api;
