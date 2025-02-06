const { newsService } = require("./news.service");
const sendResponse = require("../../../shared/sendResponse");
const catchAsync = require("../../../shared/catchAsync");

const postNews = catchAsync(async (req, res) => {
  const result = await newsService.postNews(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News posted",
    data: result,
  });
});

const getAllNews = catchAsync(async (req, res) => {
  const result = await newsService.getAllNews(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News retrieved",
    data: result,
  });
});

const getSingleNews = catchAsync(async (req, res) => {
  const result = await newsService.getSingleNews(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News retrieved",
    data: result,
  });
});

const deleteSingleNews = catchAsync(async (req, res) => {
  const result = await newsService.deleteSingleNews(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "News deleted",
    data: result,
  });
});

const newsController = {
  postNews,
  getAllNews,
  getSingleNews,
  deleteSingleNews,
};

module.exports = { newsController };
