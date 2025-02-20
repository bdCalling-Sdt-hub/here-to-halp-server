const Review = require("./review.model");
const QueryBuilder = require("../../../builder/queryBuilder");
const validateFields = require("../../../util/validateFields");
const ApiError = require("../../../error/ApiError");
const { default: status } = require("http-status");

const postReview = async (userData, payload, files) => {
  validateFields(payload, ["userName", "address", "review", "occupation"]);
  validateFields(files, ["profile_image"]);

  const reviewData = {
    profile_image: files.profile_image[0].path,
    ...payload,
  };

  const review = await Review.create(reviewData);

  return review;
};

const getAllReview = async (query) => {
  const reviewQuery = new QueryBuilder(
    Review.find({}).populate([
      {
        path: "user",
        select: "name address profile_image",
      },
    ]),
    query
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    reviewQuery.modelQuery,
    reviewQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const deleteReview = async (query) => {
  validateFields(query, ["reviewId"]);

  const result = await Review.deleteOne({ _id: query.reviewId });

  if (!result.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Review not found");

  return result;
};

const ReviewService = {
  postReview,
  getAllReview,
  deleteReview,
};

module.exports = { ReviewService };
