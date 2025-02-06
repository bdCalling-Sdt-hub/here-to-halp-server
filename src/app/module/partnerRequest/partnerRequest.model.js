const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, model } = mongoose;

const PartnerRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Please provide a valid email address",
      },
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    previousJobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    previousJobStartDate: {
      type: Date,
      required: true,
    },
    previousJobEndDate: {
      type: Date,
      required: true,
    },
    previousJobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "canceled", "accepted"],
        message:
          "{VALUE} is not supported. Supported values: pending, canceled, accepted",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const PartnerRequest = model("PartnerRequest", PartnerRequestSchema);

module.exports = PartnerRequest;
