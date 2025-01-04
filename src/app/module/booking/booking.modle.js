const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const BookingSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
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
    },
    pricingDetails: {
      type: Array,
      required: true,
    },
    serviceDetails: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "solved"],
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

const Booking = model("Booking", BookingSchema);
module.exports = Booking;
