const { Schema, model, Types } = require("mongoose");

const feedbackSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    inquiryType: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
    },
  },
  { timestamps: true }
);

const Feedback = model("Feedback", feedbackSchema);

module.exports = Feedback;
