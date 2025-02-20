const Review = require("./review.model");
const QueryBuilder = require("../../../builder/queryBuilder");
const validateFields = require("../../../util/validateFields");

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

const ReviewService = {
  postReview,
  getAllReview,
};

module.exports = { ReviewService };
