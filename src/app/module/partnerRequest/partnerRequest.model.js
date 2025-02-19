const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, model } = mongoose;

const PartnerRequestSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    businessName: {
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
    businessWebsite: {
      type: String,
      trim: true,
    },
    industryType: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    typeOfPartnership: {
      type: Array,
      required: true,
    },
    hasActiveClients: {
      type: Boolean,
      required: true,
    },
    numOfEmployees: {
      type: String,
      required: true,
      trim: true,
    },
    additionalComments: {
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
