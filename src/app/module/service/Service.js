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
        },
        currentPrice: {
          type: String,
        },
        newPrice: {
          type: String,
        },
        newSubtitle: {
          type: String,
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
