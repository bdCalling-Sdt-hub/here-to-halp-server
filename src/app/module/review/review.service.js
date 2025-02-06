const Review = require("./review.model");
const QueryBuilder = require("../../../builder/queryBuilder");
const validateFields = require("../../../util/validateFields");

const postReview = async (userData, payload) => {
  validateFields(payload, ["userName", "address", "review"]);

  const reviewData = {
    ...(userData && { user: userData.userId }),
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
        select: "name address",
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

const ReviewService = {
  postReview,
  getAllReview,
};

module.exports = { ReviewService };
