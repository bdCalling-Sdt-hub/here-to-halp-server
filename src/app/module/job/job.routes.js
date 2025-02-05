const express = require("express");
const JobController = require("./Job.controller");
const config = require("../../../config");
const auth = require("../../middleware/auth");
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
