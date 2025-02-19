const { status } = require("http-status");

const Ticket = require("../ticket/ticket.model");
const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const validateFields = require("../../../util/validateFields");
const EmailHelpers = require("../../../util/emailHelpers");
const Service = require("./Service");

// ticket -------------------------------------
const postTicket = async (userData, payload) => {
  validateFields(payload, [
    "companyName",
    "email",
    "priority",
    "service",
    "summary",
    "description",
    "document",
    "status",
  ]);

  const { userId } = userData || {};
  const { userIdentity } = payload;

  if (!userIdentity && !userId)
    throw new ApiError(status.BAD_REQUEST, "User identity or id is required");
  if (userIdentity && userId)
    throw new ApiError(
      status.BAD_REQUEST,
      "User identity, id - only one is needed"
    );

  const ticketData = {
    ...(userIdentity && { userIdentity }),
    ...(userId && { user: userId }),
    companyName: payload.companyName,
    email: payload.email,
    priority: payload.priority,
    service: payload.service,
    summary: payload.summary,
    description: payload.description,
    document: payload.document,
    status: payload.status,
  };

  const result = await Ticket.create(ticketData);

  const emailData = {
    uniqueId: result.uniqueId,
    companyName: payload.companyName,
    email: payload.email,
    priority: payload.priority,
    service: payload.service,
    summary: payload.summary,
    description: payload.description,
    document: payload.document,
    status: result.status,
  };

  EmailHelpers.sendTicketEmail(payload.email, emailData);

  return result;
};

const getAllTicket = async (query) => {
  const ticketQuery = new QueryBuilder(Ticket.find({}), query)
    .search(["uniqueId", "companyName", "email", "service"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    ticketQuery.modelQuery,
    ticketQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getMyTicket = async (userData, query) => {
  const { userId } = userData || {};
  const { userIdentity, ...newQuery } = query;
  console.log(userData);

  if (!userIdentity && !userId)
    throw new ApiError(status.BAD_REQUEST, "User identity or id is required");
  if (userIdentity && userId)
    throw new ApiError(
      status.BAD_REQUEST,
      "User identity, id - only one is needed"
    );

  const findObj = {
    ...(userIdentity && { userIdentity }),
    ...(userId && { user: userId }),
  };

  const ticketQuery = new QueryBuilder(Ticket.find(findObj), newQuery)
    .search(["uniqueId", "userIdentity", "companyName", "email", "service"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    ticketQuery.modelQuery,
    ticketQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getSingleTicket = async (query) => {
  const { ticketId } = query;

  validateFields(query, ["ticketId"]);

  const ticket = await Ticket.findById(ticketId).lean();

  if (!ticket) throw new ApiError(status.NOT_FOUND, "Ticket not found");
  return ticket;
};

const deleteTicket = async (query) => {
  const { ticketId } = query;

  validateFields(query, ["ticketId"]);

  const ticket = await Ticket.deleteOne({ _id: ticketId });

  if (!ticket.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Ticket not found");

  return ticket;
};

const updateTicketStatus = async (payload) => {
  const { ticketId, status: ticketStatus } = payload;

  validateFields(payload, ["ticketId", "status"]);

  const result = await Ticket.findOneAndUpdate(
    { _id: ticketId },
    { status: ticketStatus },
    { new: true, runValidators: true }
  );

  if (!result) throw new ApiError(status.NOT_FOUND, "Ticket not found");

  return result;
};

// bookings -------------------------------------
const postBooking = async (userData, payload) => {
  validateFields(payload, [
    "companyName",
    "contactNumber",
    "email",
    "priceDetails",
    "serviceDetails",
    "location",
    "description",
    "status",
  ]);

  const { userId } = userData || {};
  const { userIdentity } = payload;

  if (!userIdentity && !userId)
    throw new ApiError(status.BAD_REQUEST, "User identity or id is required");

  const bookingData = {
    ...(userIdentity && { userIdentity }),
    ...(userId && { user: userId }),
    companyName: payload.companyName,
    contactNumber: payload.contactNumber,
    email: payload.email,
    priceDetails: payload.priceDetails,
    serviceDetails: payload.serviceDetails,
    location: payload.location,
    description: payload.description,
    status: payload.status,
  };

  const result = await Ticket.create(bookingData);
  return result;
};

const getAllBooking = async (query) => {
  const bookingQuery = new QueryBuilder(Booking.find({}), query)
    .search(["uniqueId", "companyName", "contactNumber", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    bookingQuery.modelQuery,
    bookingQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getSingleBooking = async (userData, payload) => {};

const getMyBooking = async (userData, payload) => {};

const deleteBooking = async (userData, payload) => {};

const updateBookingStatus = async (userData, payload) => {};

// service packages -------------------------------------

const addService = async (payload) => {
  validateFields(payload, ["serviceName"]);

  const service = await Service.create(payload);

  return service;
};

const getService = async (query) => {
  validateFields(query, ["serviceName"]);

  const serviceName = query.serviceName.trim().toLowerCase();

  const service = await Service.findOne({
    serviceName: serviceName,
  }).lean();

  if (!service) throw new ApiError(status.NOT_FOUND, "Service not found");
  return service;
};

const updateService = async (payload) => {
  validateFields(payload, ["serviceName"]);

  const service = await Service.findOneAndUpdate(
    { serviceName: payload.serviceName },
    { packages: payload.packages },
    { new: true, runValidators: true }
  );

  return service;
};

const deleteService = async (query) => {
  validateFields(query, ["serviceName"]);

  const serviceName = query.serviceName.trim().toLowerCase();

  const service = await Service.deleteOne({
    serviceName: serviceName,
  }).lean();

  if (!service.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Service not found");

  return service;
};

const ServiceService = {
  postTicket,
  getAllTicket,
  getMyTicket,
  getSingleTicket,
  deleteTicket,
  updateTicketStatus,

  postBooking,
  getAllBooking,
  getSingleBooking,
  getMyBooking,
  deleteBooking,
  updateBookingStatus,

  addService,
  getService,
  updateService,
  deleteService,
};

module.exports = { ServiceService };
