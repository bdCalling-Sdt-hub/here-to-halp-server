const { BlogService } = require("./news.service");
const sendResponse = require("../../../shared/sendResponse");
const catchAsync = require("../../../shared/catchAsync");

const postBlog = catchAsync(async (req, res) => {
  const result = await BlogService.postBlog(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog posted",
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlog(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog retrieved",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getSingleBlog(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog retrieved",
    data: result,
  });
});

const deleteSingleBlog = catchAsync(async (req, res) => {
  const result = await BlogService.deleteSingleBlog(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted",
    data: result,
  });
});

const BlogController = {
  postBlog,
  getAllBlog,
  getSingleBlog,
  deleteSingleBlog,
};

module.exports = { BlogController };
