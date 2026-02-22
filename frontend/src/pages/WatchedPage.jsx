import { useState, useEffect, useCallback } from 'react';
import movieApi from '../api/movieApi';
import MovieList from '../components/MovieList';

function WatchedPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await movieApi.getMovies('watched');
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;
    
    try {
      await movieApi.deleteMovie(id);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error('Error deleting movie:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Already Watched</h1>
        <p className="text-gray-600">Movies you have completed watching</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <MovieList
          movies={movies}
          onDelete={handleDelete}
          showWatchedButton={false}
          emptyMessage="No watched movies yet. Start watching some movies from your watchlist!"
        />
      )}
    </div>
  );
}

export default WatchedPage;
