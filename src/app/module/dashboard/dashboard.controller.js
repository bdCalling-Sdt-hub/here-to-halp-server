const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const DashboardService = require("./dashboard.service");

// user-host management ========================
const getAllUser = catchAsync(async (req, res) => {
  const result = await DashboardService.getAllUser(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data: result.result,
    meta: result.meta,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await DashboardService.getSingleUser(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Details retrieved successfully",
    data: result,
  });
});

const blockUnblockUser = catchAsync(async (req, res) => {
  const result = await DashboardService.blockUnblockUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully updated",
    data: result,
  });
});

// overview ========================
const totalOverview = catchAsync(async (req, res) => {
  const result = await DashboardService.totalOverview();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Total overview retrieved successfully",
    data: result,
  });
});

const growth = catchAsync(async (req, res) => {
  const result = await DashboardService.growth(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Growth retrieved successfully",
    data: result,
  });
});

const DashboardController = {
  totalOverview,
  getAllUser,
  getSingleUser,
  blockUnblockUser,
  growth,
};

module.exports = DashboardController;
