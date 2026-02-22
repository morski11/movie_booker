import StarRating from './StarRating';

function MovieCard({ movie, onMarkWatched, onDelete, showWatchedButton = false }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {movie.title}
          </h3>
          <StarRating rating={movie.rating} readonly size="sm" />
        </div>
        
        <p className="text-sm text-gray-500 mb-2">
          Directed by <span className="font-medium text-gray-700">{movie.author}</span>
        </p>
        
        {movie.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {movie.description}
          </p>
        )}
        
        <div className="text-xs text-gray-400 mb-4">
          <p>Added: {formatDate(movie.createdAt)}</p>
          {movie.watchedAt && (
            <p className="text-green-600 font-medium">
              Watched: {formatDate(movie.watchedAt)}
            </p>
          )}
        </div>
        
        <div className="flex space-x-2">
          {showWatchedButton && (
            <button
              onClick={() => onMarkWatched(movie.id)}
              className="flex-1 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition"
            >
              ✓ Mark as Watched
            </button>
          )}
          <button
            onClick={() => onDelete(movie.id)}
            className="px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
