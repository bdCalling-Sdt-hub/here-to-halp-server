const { Schema, model, Types } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const ServiceSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Service = model("Service", ServiceSchema);

module.exports = Service;
