const catchAsync = require("../../../shared/catchAsync");
const sendResponse = require("../../../shared/sendResponse");
const NewsletterService = require("./newsletter.services");

const postNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.postNewsletter(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message ? result.message : "Newsletter added",
    data: result.result ? result.result : result,
  });
});

const getNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.getNewsletter(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Newsletter retrieved",
    data: result,
  });
});

const getAllNewsletters = catchAsync(async (req, res) => {
  const result = await NewsletterService.getAllNewsletters(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Newsletters retrieved",
    data: result,
  });
});

const deleteNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.deleteNewsletter(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Newsletter deleted",
    data: result,
  });
});

const NewsletterController = {
  postNewsletter,
  getNewsletter,
  getAllNewsletters,
  deleteNewsletter,
};

module.exports = NewsletterController;
