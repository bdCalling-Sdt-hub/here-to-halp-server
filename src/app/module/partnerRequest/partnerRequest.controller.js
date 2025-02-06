const { PartnerRequestService } = require("./partnerRequest.service");
const sendResponse = require("../../../shared/sendResponse");
const catchAsync = require("../../../shared/catchAsync");

const postPartnerReq = catchAsync(async (req, res) => {
  const result = await PartnerRequestService.postPartnerReq(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Partner request submitted",
    data: result,
  });
});

const getAllPartnerReq = catchAsync(async (req, res) => {
  const result = await PartnerRequestService.getAllPartnerReq(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Partner requests retrieved",
    data: result,
  });
});

const getSinglePartnerReq = catchAsync(async (req, res) => {
  const result = await PartnerRequestService.getSinglePartnerReq(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Partner request retrieved",
    data: result,
  });
});

const deleteSinglePartnerReq = catchAsync(async (req, res) => {
  const result = await PartnerRequestService.deleteSinglePartnerReq(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Partner request deleted",
    data: result,
  });
});

const getMyPartnerReq = catchAsync(async (req, res) => {
  const result = await PartnerRequestService.getMyPartnerReq(
    req.user,
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My partner requests retrieved",
    data: result,
  });
});

const PartnerRequestController = {
  postPartnerReq,
  getAllPartnerReq,
  getSinglePartnerReq,
  deleteSinglePartnerReq,
  getMyPartnerReq,
};

module.exports = { PartnerRequestController };
