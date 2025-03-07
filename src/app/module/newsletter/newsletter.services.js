const { default: status } = require("http-status");
const QueryBuilder = require("../../../builder/queryBuilder");
const ApiError = require("../../../error/ApiError");
const validateFields = require("../../../util/validateFields");
const Newsletter = require("./Newsletter");

const postNewsletter = async (payload) => {
  validateFields(payload, ["email"]);
  return await Newsletter.create(payload);
};

const getNewsletter = async (query) => {
  validateFields(query, ["newsletterId"]);

  const newsletter = await Newsletter.findById(query.newsletterId);

  if (!newsletter) throw new ApiError(status.NOT_FOUND, "Newsletter not found");

  return newsletter;
};

const getAllNewsletters = async (query) => {
  const newsletterQuery = new QueryBuilder(Newsletter.find(), query)
    .search(["email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    newsletterQuery.modelQuery,
    newsletterQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const deleteNewsletter = async (payload) => {
  validateFields(payload, ["newsletterId"]);

  const result = await Newsletter.deleteOne({ _id: payload.newsletterId });

  if (!result.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Newsletter not found");

  return result;
};

const NewsletterService = {
  postNewsletter,
  getNewsletter,
  getAllNewsletters,
  deleteNewsletter,
};

module.exports = NewsletterService;
