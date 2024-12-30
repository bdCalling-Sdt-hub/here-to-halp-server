const { status } = require("http-status");

const Ticket = require("../ticket/ticket.model");
const Service = require("./service.model");
const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const validateFields = require("../../../util/validateFields");

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

  const result = await Ticket.updateOne(
    { _id: ticketId },
    { status: ticketStatus }
  );

  if (!result.matchedCount)
    throw new ApiError(status.NOT_FOUND, "Ticket not found");

  return result;
};

const postService = async (userData, payload) => {
  const { userId } = userData;
  const serviceData = { user: userId, ...payload };

  validateFields(payload, ["service"]);

  const result = await Service.create(serviceData);
  return result;
};

const getAllService = async (query) => {
  const serviceQuery = new QueryBuilder(Service.find({}), query)
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    serviceQuery.modelQuery,
    serviceQuery.countTotal(),
  ]);

  if (!result.length) throw new ApiError(status.NOT_FOUND, "Service not found");

  return {
    meta,
    result,
  };
};

const ServiceService = {
  postTicket,
  getAllTicket,
  getMyTicket,
  getSingleTicket,
  deleteTicket,
  updateTicketStatus,
  postService,
  getAllService,
};

module.exports = { ServiceService };
