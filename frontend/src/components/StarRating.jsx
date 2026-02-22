function StarRating({ rating, onRatingChange, readonly = false, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={readonly}
          className={`${sizeClasses[size]} ${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          } transition-transform focus:outline-none`}
        >
          <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

export default StarRating;
