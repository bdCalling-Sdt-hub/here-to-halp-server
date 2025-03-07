const express = require("express");
const auth = require("../../middleware/auth");
const NewsletterController = require("./newsletter.controller");
const config = require("../../../config");

const router = express.Router();

router
  .post("/post-newsletter", NewsletterController.postNewsletter)
  .get("/get-newsletter", NewsletterController.getNewsletter)
  .get(
    "/get-all-newsletters",
    auth(config.auth_level.admin),
    NewsletterController.getAllNewsletters
  )
  .delete(
    "/delete-newsletter",
    auth(config.auth_level.admin),
    NewsletterController.deleteNewsletter
  );

module.exports = router;
