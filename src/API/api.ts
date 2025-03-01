import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
  withCredentials: true, // To send cookies with requests (e.g., JWT tokens)
});

export default api;
