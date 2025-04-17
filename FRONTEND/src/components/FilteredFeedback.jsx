import React, { useState, useEffect } from 'react';
import axios from 'axios';

const categories = ['Product Features', 'Product Pricing', 'Product Usability'];

const FilteredFeedback = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (selectedCategory && token) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/v1/feedback/${selectedCategory}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setFeedbacks(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedCategory]);

  return (
    <div className="my-6 px-8 py-6 bg-white shadow-2xl rounded-2xl max-w-7xl mx-auto">
      <label className="block text-2xl font-bold text-gray-800 mb-4">
        View Feedback by Category
      </label>

      <select
        className="mb-6 p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {loading ? (
        <div className="text-center text-blue-600 font-medium">Loading feedback...</div>
      ) : feedbacks.length === 0 && selectedCategory ? (
        <div className="text-center text-gray-500 italic">
          No feedback found for <strong>{selectedCategory}</strong>.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {feedbacks.map((fb, index) => (
            <div
              key={index}
              className="h-full p-6 border border-gray-200 rounded-2xl shadow-md bg-white hover:shadow-lg transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-xl text-gray-800">
                    {fb.user?.name || ' Anonymous'}
                  </h3>
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    ⭐ {fb.rating}
                  </span>
                </div>
                <p className="text-gray-700 text-base mb-3">{fb.comment}</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredFeedback;
