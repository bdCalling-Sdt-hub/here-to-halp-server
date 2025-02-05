const { default: status } = require("http-status");
const QueryBuilder = require("../../../builder/queryBuilder");
const ApiError = require("../../../error/ApiError");
const validateFields = require("../../../util/validateFields");
const Job = require("./Job");

const postJob = async (payload) => {
  validateFields(payload, ["title", "location", "details"]);

  // const jobData = {
  //   title: payload.title,
  //   location: payload.location,
  //   description: payload.description,
  // };

  return await Job.create(payload);
  // return await Job.create(jobData);
};

const getAllJob = async (query) => {
  const jobQuery = new QueryBuilder(Job.find({}), query)
    .search(["jobRequisitionId", "title", "location"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    jobQuery.modelQuery,
    jobQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getSingleJob = async (query) => {
  validateFields(query, ["jobId"]);

  const job = await Job.findById(query.jobId);

  if (!job) throw new ApiError(status.NOT_FOUND, "Job not found");

  return job;
};

const deleteSingleJob = async (userData, query) => {
  validateFields(query, ["jobId"]);

  const job = await Job.deleteOne({ _id: query.jobId });

  if (!job.deletedCount) throw new ApiError(status.NOT_FOUND, "Job not found");

  return job;
};

const JobService = {
  postJob,
  getAllJob,
  getSingleJob,
  deleteSingleJob,
};

module.exports = JobService;
