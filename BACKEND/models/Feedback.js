const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


  category: {
    type: String,
    enum: ["Product Features", "Product Pricing", "Product Usability"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
