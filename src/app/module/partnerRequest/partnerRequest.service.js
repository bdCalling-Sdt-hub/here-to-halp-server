const { status } = require("http-status");
const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const PartnerRequest = require("./partnerRequest.model");
const validateFields = require("../../../util/validateFields");

const postPartnerReq = async (req) => {
  const { files, body, user } = req;

  validateFields(files, ["resume"]);
  validateFields(body, [
    "fullName",
    "contactNumber",
    "email",
    "city",
    "state",
    "country",
    "description",
    "position",
    "previousJobTitle",
    "previousJobStartDate",
    "previousJobEndDate",
    "previousJobDescription",
  ]);

  const partnerReqData = {
    ...(user && { user: user.userId }),
    fullName: body.fullName,
    contactNumber: body.contactNumber,
    email: body.email,
    city: body.city,
    state: body.state,
    country: body.country,
    description: body.description,
    position: body.position,
    previousJobTitle: body.previousJobTitle,
    previousJobStartDate: body.previousJobStartDate,
    previousJobEndDate: body.previousJobEndDate,
    previousJobDescription: body.previousJobDescription,
    resume: files.resume[0].path,
    status: body.status || "pending",
  };

  const result = await PartnerRequest.create(partnerReqData);
  return result;
};

const getAllPartnerReq = async (query) => {
  const partnerReqQuery = new QueryBuilder(PartnerRequest.find({}), query)
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
