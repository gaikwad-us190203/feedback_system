
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../services/api';
import { Link } from 'react-router-dom';

const GoogleLoginComponent = ({ onLoginSuccess }) => {
  const handleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await googleLogin(credential);

      localStorage.setItem('authToken', response.data.token);
      onLoginSuccess(response.data.user);
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to <span className="text-blue-600">Feedbackify</span>
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Share your thoughts on product features, pricing, and usability. Your feedback helps us improve!
      </p>
      <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Login Failed')} />
      <Link to="/about" className="mt-6 text-blue-500 underline hover:text-blue-700">
        Learn more about us →
      </Link>
    </div>
  );
};

export default GoogleLoginComponent;
