const express = require("express");
const auth = require("../../middleware/auth");
const { ReviewController } = require("./review.controller");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-review",
    auth(config.auth_level.user, false),
    ReviewController.postReview
  )
  .get("/get-all-review", ReviewController.getAllReview);

module.exports = router;
