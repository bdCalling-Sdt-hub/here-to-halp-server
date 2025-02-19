const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    packages: [
      {
        pricingOption: {
          type: String,
          required: true,
        },
        currentPrice: {
          type: String,
          required: true,
        },
        newPrice: {
          type: String,
          required: true,
        },
        newSubtitle: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
