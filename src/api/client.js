// api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.32:8000/api', // IP local de tu PC
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
