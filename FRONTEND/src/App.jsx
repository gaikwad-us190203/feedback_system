
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import GoogleLoginComponent from './components/GoogleLogin';
import FeedbackForm from './components/FeedbackForm';
import FilteredFeedback from './components/FilteredFeedback';
import AboutPage from './components/AboutPage'; 

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-4">
        <Link to="/" className="text-lg text-blue-500 mr-4">Home</Link>
        <Link to="/about" className="text-lg text-blue-500">About</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <GoogleLoginComponent onLoginSuccess={handleLoginSuccess} />
            ) : (
              <div className="max-w-xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">
                  Welcome, {user.name}
                </h1>
                <FeedbackForm user={user} />
                <FilteredFeedback />
              </div>
            )
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
};

export default App;
