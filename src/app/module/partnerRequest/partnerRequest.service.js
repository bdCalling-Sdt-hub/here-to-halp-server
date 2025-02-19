const { status } = require("http-status");
const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const PartnerRequest = require("./partnerRequest.model");
const validateFields = require("../../../util/validateFields");

const postPartnerReq = async (user, payload) => {
  validateFields(payload, [
    "businessName",
    "contactNumber",
    "email",
    "city",
    "state",
    "country",
    "businessWebsite",
    "industryType",
    "description",
    "typeOfPartnership",
    "hasActiveClients",
    "numOfEmployees",
    "additionalComments",
  ]);

  const partnerReqData = {
    ...(user && { user: user.userId }),
    businessName: payload.businessName,
    contactNumber: payload.contactNumber,
    email: payload.email,
    city: payload.city,
    state: payload.state,
    country: payload.country,
    businessWebsite: payload.businessWebsite,
    industryType: payload.industryType,
    description: payload.description,
    typeOfPartnership: payload.typeOfPartnership,
    hasActiveClients: payload.hasActiveClients,
    numOfEmployees: payload.numOfEmployees,
    additionalComments: payload.additionalComments,
  };

  const result = await PartnerRequest.create(partnerReqData);
  return result;
};

const getAllPartnerReq = async (query) => {
  const partnerReqQuery = new QueryBuilder(PartnerRequest.find({}), query)
    .search(["businessName", "email", "contactNumber"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    partnerReqQuery.modelQuery,
    partnerReqQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getSinglePartnerReq = async (query) => {
  validateFields(query, ["partnerReqId"]);

  const partnerReq = await PartnerRequest.findById(query.partnerReqId).lean();
  if (!partnerReq)
    throw new ApiError(status.NOT_FOUND, "Partner request not found");

  return partnerReq;
};

const deleteSinglePartnerReq = async (query) => {
  validateFields(query, ["partnerReqId"]);

  const partnerReq = await PartnerRequest.deleteOne({
    _id: query.partnerReqId,
  });
  if (!partnerReq.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Partner request not found");

  return partnerReq;
};

const getMyPartnerReq = async (userData, query) => {
  validateFields(userData, ["email"]);

  const partnerReqQuery = new QueryBuilder(
    PartnerRequest.find({ user: userData.userId }),
    query
  )
    .search(["fullName", "email", "contactNumber"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    partnerReqQuery.modelQuery,
    partnerReqQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const PartnerRequestService = {
  postPartnerReq,
  getAllPartnerReq,
  getSinglePartnerReq,
  deleteSinglePartnerReq,
  getMyPartnerReq,
};

module.exports = { PartnerRequestService };
