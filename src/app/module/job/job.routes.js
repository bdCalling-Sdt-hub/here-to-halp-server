const express = require("express");
const config = require("../../../config");
const auth = require("../../middleware/auth");
const JobController = require("./Job.controller.js");
const router = express.Router();

router
  .post("/post-job", auth(config.auth_level.admin), JobController.postJob)
  .get("/get-all-job", JobController.getAllJob)
  .get("/get-single-job", JobController.getSingleJob)
  .delete(
    "/delete-single-job",
    auth(config.auth_level.admin),
    JobController.deleteSingleJob
  );

module.exports = router;
