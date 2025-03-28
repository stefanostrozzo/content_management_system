import axios from 'axios';

// Crea un'istanza di axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Cambia l'URL in base al tuo backend
});

// Funzione per ottenere i post
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
