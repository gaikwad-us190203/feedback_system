Feedback System
A simple feedback system built with the MERN stack (MongoDB, Express.js, React, Node.js) that enables users to log in with Google and submit feedback across key product categories.

Features
Google OAuth Login: Secure authentication using Google accounts.

Feedback Submission: Users can submit feedback with a category, rating, and optional comments.

Aggregated Feedback View: View all feedback grouped by category for better insights

Tech Stack
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB
Authentication: Google OAuth 2.0

*** how to run this project on your system 
##Backend
Step 1:Clone the Repository :git clone https://github.com/gaikwad-us190203/feedback_system.git cd feedback_system
Step 2:Navigate to the backend directory: cd Backend
Step 3:Install dependencies:npm install
Step4:create .env file in Backend folder and write below things in it
        MONGO_URI=your_mongodb_connection_string
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        JWT_SECRET=your_session_secret
        FRONTEND_URL=http://localhost:3000
Step 5:Start the backend server: npm start

##Frontend
Step 6:Open a new terminal and navigate to the frontend directory:cd../Frontend
Step 7:Install dependencies: npm install
Step 8:start the frontend server :npm run dev
step 9:Configure Google OAuth
      Go to the Google Cloud Console.Create a new project or select an existing one.Set up OAuth 2.0 credentials with the following:
      Authorized JavaScript origins: http://localhost:3000 Authorized redirect URIs: http://localhost:4000/api/auth/google/callback
      Copy your Client ID and Client Secret into the .env file in the backend.

        


