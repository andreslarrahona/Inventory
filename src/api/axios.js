import axios from 'axios';

// Usa la variable de entorno para la URL base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Usamos la variable de entorno aquí
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
