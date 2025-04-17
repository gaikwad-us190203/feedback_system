const express = require("express");
const router = express.Router();
const { postFeedback, getAggregatedFeedback,getAggregatedFeedback_bycategory} = require("../controllers/feedback");
const authenticate = require('../middleware/authenticate');


router.post("/", authenticate, postFeedback);

router.get("/aggregate", getAggregatedFeedback);

router.get('/:category', authenticate, getAggregatedFeedback_bycategory);
  
  

module.exports = router;


