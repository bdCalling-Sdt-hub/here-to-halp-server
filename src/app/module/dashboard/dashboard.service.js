const { default: status } = require("http-status");
const User = require("../user/user.model");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const Auth = require("../auth/auth.model");
const QueryBuilder = require("../../../builder/queryBuilder");
const ApiError = require("../../../error/ApiError");
const validateFields = require("../../../util/validateFields");

// user-host management ========================
const getAllUser = async (query) => {
  const { role, ...newQuery } = query;

  const allowedRoles = [ENUM_USER_ROLE.USER, ENUM_USER_ROLE.HOST];

  if (!allowedRoles.includes(role))
    throw new ApiError(status.BAD_REQUEST, "Invalid role");

  const emailObj = await Auth.find({ role }).select("-_id email");
  const emails = emailObj.map((obj) => obj.email);

  const usersQuery = new QueryBuilder(
    User.find({ email: { $in: emails } })
      .populate("authId")
      .lean(),
    newQuery
  )
    .search(["name", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    usersQuery.modelQuery,
    usersQuery.countTotal(),
  ]);

  return { meta, result };
};

const getSingleUser = async (query) => {
  const { userId } = query;

  validateFields(query, ["userId"]);

  const user = await User.findById(userId);

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

  return { user };
};

const blockUnblockUser = async (payload) => {
  const { authId, isBlocked } = payload;

  validateFields(payload, ["authId", "isBlocked"]);

  const user = await Auth.findByIdAndUpdate(
    authId,
    { $set: { isBlocked } },
    {
      new: true,
      runValidators: true,
    }
  ).select("isBlocked email");

  if (!user) throw new ApiError(status.NOT_FOUND, "User not found");

  return user;
};

// overview ========================
const totalOverview = async () => {
  const [totalUser] = await Promise.all([User.countDocuments()]);

  return {
    totalUser,
  };
};

const DashboardService = {
  totalOverview,
  getAllUser,
  getSingleUser,
  blockUnblockUser,
};

module.exports = DashboardService;
