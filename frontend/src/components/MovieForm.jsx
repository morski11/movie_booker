import { useState } from 'react';
import StarRating from './StarRating';

function MovieForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    rating: 0,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
    if (errors.rating) {
      setErrors((prev) => ({
        ...prev,
        rating: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author/Director is required';
    }
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        title: '',
        author: '',
        description: '',
        rating: 0,
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Movie</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter movie title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Director *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter director name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Enter movie description (optional)"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating *
        </label>
        <StarRating rating={formData.rating} onRatingChange={handleRatingChange} />
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : 'Add to Watchlist'}
        </button>
      </div>
    </form>
  );
}

export default MovieForm;
