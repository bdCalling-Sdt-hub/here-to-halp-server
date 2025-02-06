const express = require("express");
const auth = require("../../middleware/auth");
const { PartnerRequestController } = require("./partnerRequest.controller");
const { uploadFile } = require("../../middleware/fileUploader");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/post-partner-request",
    auth(config.auth_level.user),
    uploadFile(),
    PartnerRequestController.postPartnerReq
  )
  .get(
    "/get-all-partner-requests",
    auth(config.auth_level.admin),
    PartnerRequestController.getAllPartnerReq
  )
  .get(
    "/get-single-partner-request",
    auth(config.auth_level.user),
    PartnerRequestController.getSinglePartnerReq
  )
  .get(
    "/get-my-partner-requests",
    auth(config.auth_level.user),
    PartnerRequestController.getMyPartnerReq
  )
  .delete(
    "/delete-single-partner-request",
    auth(config.auth_level.admin),
    PartnerRequestController.deleteSinglePartnerReq
  );

module.exports = router;
