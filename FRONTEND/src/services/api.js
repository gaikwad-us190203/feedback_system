import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

export const googleLogin = (token) => {
  return axios.post(`${API_URL}/auth/google-login`, { token });
};



export const submitFeedback = (feedbackData) => {
    const token = localStorage.getItem('authToken');
  
    return axios.post(`${API_URL}/feedback`, feedbackData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
export const getAggregatedFeedback = () => {
  return axios.get(`${API_URL}/feedback/aggregate`);
};

export const getFeedbackByCategory = (category) => {
    return axios.get(`${API_URL}/feedback/${category}`);
  };