// movieService.ts
import axios from 'axios';
import {API_KEY, BASE_URL} from './Config.ts';
import {debugError} from '../logger/Logger.ts';

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
    );
    return response.data.results;
  } catch (error) {
    debugError('Error fetching popular movies:', error);
    throw error;
  }
};

export const searchMoviesByQuery = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
    );
    return response.data.results;
  } catch (error) {
    debugError('Error searching for movies:', error);
    throw error;
  }
};
