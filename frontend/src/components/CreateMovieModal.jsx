import { useEffect, useState } from 'react';
import movieApi from '../api/movieApi';
import MovieForm from './MovieForm';

function CreateMovieModal({ open, onClose, onMovieCreated }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) return;
    onClose?.();
  };

  const handleCreateMovie = async (movieData) => {
    setIsSubmitting(true);
    try {
      const newMovie = await movieApi.createMovie(movieData);
      onMovieCreated?.(newMovie);
      onClose?.();
      return newMovie;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 px-4 py-8"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl">
        <button
          type="button"
          onClick={() => onClose?.()}
          aria-label="Close"
          className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-50"
        >
          ×
        </button>

        <MovieForm onSubmit={handleCreateMovie} isLoading={isSubmitting} />
      </div>
    </div>
  );
}

export default CreateMovieModal;
