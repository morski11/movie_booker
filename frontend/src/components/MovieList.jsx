import MovieCard from './MovieCard';

function MovieList({ movies, onMarkWatched, onDelete, showWatchedButton, emptyMessage }) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-gray-500 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMarkWatched={onMarkWatched}
          onDelete={onDelete}
          showWatchedButton={showWatchedButton}
        />
      ))}
    </div>
  );
}

export default MovieList;
