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
  .get(
    "/get-feedback",
    auth(config.auth_level.admin),
    FeedbackController.getFeedback
  )
  .get(
    "/get-my-feedback",
    auth(config.auth_level.user),
    FeedbackController.getMyFeedback
  )
  .get(
    "/get-all-feedback",
    auth(config.auth_level.admin),
    FeedbackController.getAllFeedback
  )
  .patch(
    "/reply-feedback",
    auth(config.auth_level.admin),
    FeedbackController.replyFeedback
  )
  .delete(
    "/delete-feedback",
    auth(config.auth_level.admin),
    FeedbackController.deleteFeedback
  );

module.exports = router;
