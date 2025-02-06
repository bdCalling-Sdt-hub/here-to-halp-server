const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const reviewSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
