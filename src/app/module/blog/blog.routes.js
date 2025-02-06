const express = require("express");
const auth = require("../../middleware/auth");
const { BlogController } = require("./blog.controller");
const { uploadFile } = require("../../middleware/fileUploader");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-blog",
    auth(config.auth_level.admin),
    uploadFile(),
    BlogController.postBlog
  )
  .get("/get-all-blog", BlogController.getAllBlog)
  .get("/get-single-blog", BlogController.getSingleBlog)
  .delete(
    "/delete-single-blog",
    auth(config.auth_level.admin),
    BlogController.deleteSingleBlog
  );

module.exports = router;
