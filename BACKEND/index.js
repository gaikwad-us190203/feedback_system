
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const axios = require('axios');


const app = express();
const PORT =  5000
const database = require("../BACKEND/config/database");
//database connect
database.connect();
const feedbackRoutes = require("./routes/feedbackRoutes");
const authRoutes = require("./routes/auth");

// Middleware
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
