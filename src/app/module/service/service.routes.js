const express = require("express");
const auth = require("../../middleware/auth");
const { ServiceController } = require("./service.controller");
const config = require("../../../config");

const router = express.Router();

router
  // ticket -------------------------------------
  .post(
    "/post-ticket",
    auth(config.auth_level.user, false),
    ServiceController.postTicket
  )
  .get(
    "/get-all-ticket",
    auth(config.auth_level.admin),
    ServiceController.getAllTicket
  )
  .get(
    "/get-my-ticket",
    auth(config.auth_level.user, false),
    ServiceController.getMyTicket
  )
  .get("/get-single-ticket", ServiceController.getSingleTicket)
  .delete(
    "/delete-single-ticket",
    auth(config.auth_level.admin),
    ServiceController.deleteTicket
  )
  .patch(
    "/update-ticket-status",
    auth(config.auth_level.admin),
    ServiceController.updateTicketStatus
  )
  .post(
    "/post-service",
    auth(config.auth_level.admin),
    ServiceController.addService
  )
  .get(
    "/get-service",
    ServiceController.getService
  )
  .patch(
    "/update-service",
    auth(config.auth_level.admin),
    ServiceController.updateService
  )
  .delete(
    "/delete-service",
    auth(config.auth_level.admin),
    ServiceController.deleteService
  );

module.exports = router;
