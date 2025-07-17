// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // El puerto 3000 es el de tu servidor Express
});

export default api;
