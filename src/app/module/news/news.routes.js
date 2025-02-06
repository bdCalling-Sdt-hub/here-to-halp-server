const express = require("express");
const auth = require("../../middleware/auth");
const { newsController } = require("./news.controller");
const { uploadFile } = require("../../middleware/fileUploader");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-news",
    auth(config.auth_level.admin),
    uploadFile(),
    newsController.postNews
  )
  .get("/get-all-news", newsController.getAllNews)
  .get("/get-single-news", newsController.getSingleNews)
  .delete(
    "/delete-single-news",
    auth(config.auth_level.admin),
    newsController.deleteSingleNews
  );

module.exports = router;
