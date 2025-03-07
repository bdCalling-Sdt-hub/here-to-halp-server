const { Schema, model } = require("mongoose");
const validator = require("validator");

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: [true, "You are already subscribed"],
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Newsletter = model("Newsletter", newsletterSchema);

module.exports = Newsletter;
