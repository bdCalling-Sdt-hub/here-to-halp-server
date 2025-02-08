const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const JobService = require("./job.service");

const postJob = catchAsync(async (req, res) => {
  const result = await JobService.postJob(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job posted successfully",
    data: result,
  });
});

const getAllJob = catchAsync(async (req, res) => {
  const result = await JobService.getAllJob(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job retrieved successfully",
    data: result,
  });
});

const getSingleJob = catchAsync(async (req, res) => {
  const result = await JobService.getSingleJob(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job retrieved successfully",
    data: result,
  });
});

const deleteSingleJob = catchAsync(async (req, res) => {
  const result = await JobService.deleteSingleJob(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job deleted successfully",
    data: result,
  });
});

const JobController = {
  postJob,
  getAllJob,
  getSingleJob,
  deleteSingleJob,
};

module.exports = JobController;
