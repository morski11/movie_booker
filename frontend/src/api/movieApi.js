import axios from 'axios';

const API_BASE_URL = '/api/movies';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const movieApi = {
  // Get all movies or filter by status
  getMovies: async (status = null) => {
    const params = status ? { status } : {};
    const response = await api.get('', { params });
    return response.data;
  },

  // Get a single movie by ID
  getMovieById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  // Create a new movie
  createMovie: async (movieData) => {
    const response = await api.post('', movieData);
    return response.data;
  },

  // Mark a movie as watched
  markAsWatched: async (id) => {
    const response = await api.patch(`/${id}/watched`);
    return response.data;
  },

  // Delete a movie
  deleteMovie: async (id) => {
    await api.delete(`/${id}`);
  },
};

export default movieApi;
