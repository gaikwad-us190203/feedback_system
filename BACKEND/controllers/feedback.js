const Feedback = require("../models/Feedback");

// POST feedback
const postFeedback = async (req, res) => {
  try {
    const { rating, comment, category } = req.body;

    // 👇 Get user from authenticated request (from token)
    const userId = req.user?.userId;

    const feedback = new Feedback({
      rating,
      comment,
      category,
      user: userId, // 👈 set the user
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted", data: feedback });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback", details: err.message });
  }
};


// GET aggregated feedback for all categories
const getAggregatedFeedback = async (req, res) => {
  try {
    const aggregation = await Feedback.aggregate([
      {
        $group: {
          _id: "$category",
          averageRating: { $avg: "$rating" },
          totalSubmissions: { $sum: 1 },
          comments: { $push: "$comment" }
        }
      },
      {
        $project: {
          category: "$_id",
          _id: 0,
          averageRating: { $round: ["$averageRating", 1] },
          totalSubmissions: 1,
          comments: 1
        }
      }
    ]);

    res.status(200).json(aggregation);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch aggregated feedback", details: err.message });
  }
};



const getAggregatedFeedback_bycategory = async (req, res) => {
  const category = req.params.category;
  console.log("Fetching feedback for category:", category);

  try {
    const feedbacks = await Feedback.find({ category }).populate("user", "name"); 

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedback by category:", err);
    res.status(500).json({ error: "Failed to fetch feedbacks by category" });
  }
};





module.exports = { postFeedback, getAggregatedFeedback, getAggregatedFeedback_bycategory};
