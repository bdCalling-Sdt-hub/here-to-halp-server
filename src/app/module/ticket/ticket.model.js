const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const TicketSchema = new Schema(
  {
    user: {
      type: ObjectId,
    },
    userIdentity: {
      type: String,
    },
    uniqueId: {
      type: String,
      unique: true,
    },
    companyName: {
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
    },
    priority: {
      type: String,
      enum: {
        values: ["high", "low", "medium"],
        message:
          "{VALUE} is not supported. Supported values: high, low, medium",
      },
      default: "medium",
    },
    service: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "ongoing", "solved"],
        message:
          "{VALUE} is not supported. Supported values: high, low, medium",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

TicketSchema.pre("save", async function (next) {
  if (!this.uniqueId) {
    this.uniqueId = this._id.toString().toUpperCase();
  }
});

const Ticket = model("Ticket", TicketSchema);

module.exports = Ticket;
