const auth = require("../../middleware/auth");
const express = require("express");
const DashboardController = require("./dashboard.controller");
const config = require("../../../config");

const router = express.Router();

router
  // user-host management ========================
  .get(
    "/get-all-user",
    auth(config.auth_level.admin),
    DashboardController.getAllUser
  )
  .get(
    "/get-user-details",
    auth(config.auth_level.admin),
    DashboardController.getSingleUser
  )
  .patch(
    "/block-unblock-user",
    auth(config.auth_level.admin),
    DashboardController.blockUnblockUser
  )

  // overview ========================
  .get(
    "/total-overview",
    auth(config.auth_level.admin),
    DashboardController.totalOverview
  );

module.exports = router;
