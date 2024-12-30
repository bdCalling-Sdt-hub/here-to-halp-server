const express = require("express");
const auth = require("../../middleware/auth");
const { FeedbackController } = require("./feedback.controller");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-feedback",
    auth(config.auth_level.user),
    FeedbackController.postFeedback
  )
  .get("/get-all-feedback", FeedbackController.getAllFeedback);

module.exports = router;
