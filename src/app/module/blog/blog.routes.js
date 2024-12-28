const express = require("express");
const auth = require("../../middleware/auth");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const { BlogController } = require("./blog.controller");
const { uploadFile } = require("../../middleware/fileUploader");

const router = express.Router();

router
  .post(
    "/post-blog",
    auth(ENUM_USER_ROLE.ADMIN),
    uploadFile(),
    BlogController.postBlog
  )
  .get("/get-all-blog", BlogController.getAllBlog)
  .get("/get-single-blog", BlogController.getSingleBlog)
  .delete(
    "/delete-single-blog",
    auth(ENUM_USER_ROLE.ADMIN),
    BlogController.deleteSingleBlog
  );

module.exports = router;
