import React, { useState } from 'react';
import { submitFeedback } from '../services/api';

const categories = [
  'Product Features',
  'Product Pricing',
  'Product Usability'
];

const FeedbackForm = ({ user }) => {
  const [rating, setRating] = useState(1);
  const [category, setCategory] = useState('Product Features');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitFeedback({ rating, comment, category });
      alert(' Feedback submitted!');
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(' Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl space-y-6 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold text-gray-800"> Submit Your Feedback</h2>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Category</label>
        <select
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Rating (1–5)</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Comment</label>
        <textarea
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your thoughts here..."
          className="w-full border border-gray-300 rounded-xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-2 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting...' : ' Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
