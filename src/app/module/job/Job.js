const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobRequisitionId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

JobSchema.pre("save", async function (next) {
  if (!this.jobRequisitionId) {
    this.jobRequisitionId = this._id.toString().toUpperCase();
  }
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
