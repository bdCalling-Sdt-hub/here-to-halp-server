const { ServiceService } = require("./service.service");
const sendResponse = require("../../../shared/sendResponse");
const catchAsync = require("../../../shared/catchAsync");

const postTicket = catchAsync(async (req, res) => {
  const result = await ServiceService.postTicket(req.user, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket posted",
    data: result,
  });
});

const getAllTicket = catchAsync(async (req, res) => {
  const result = await ServiceService.getAllTicket(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket retrieved",
    data: result,
  });
});

const getMyTicket = catchAsync(async (req, res) => {
  const result = await ServiceService.getMyTicket(req.user, req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket retrieved",
    data: result,
  });
});

const getSingleTicket = catchAsync(async (req, res) => {
  const result = await ServiceService.getSingleTicket(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket retrieved",
    data: result,
  });
});

const deleteTicket = catchAsync(async (req, res) => {
  const result = await ServiceService.deleteTicket(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket deleted",
    data: result,
  });
});

const updateTicketStatus = catchAsync(async (req, res) => {
  const result = await ServiceService.updateTicketStatus(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Ticket status updated",
    data: result,
  });
});

const ServiceController = {
  postTicket,
  getAllTicket,
  getMyTicket,
  getSingleTicket,
  deleteTicket,
  updateTicketStatus,
};

module.exports = { ServiceController };
