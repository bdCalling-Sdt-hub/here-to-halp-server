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

const growth = async (query) => {
  const { year: yearStr, role } = query;

  validateFields(query, ["role", "year"]);

  const year = Number(yearStr);
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year + 1, 0, 1);

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en", { month: "long" })
  );

  // Aggregate monthly registration counts and list of all years
  const [monthlyRegistration, distinctYears] = await Promise.all([
    Auth.aggregate([
      {
        $match: {
          role: role,
          createdAt: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]),
    Auth.aggregate([
      {
        $match: {
          role: role,
        },
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
        },
      },
      {
        $project: {
          year: "$_id",
          _id: 0,
        },
      },
      {
        $sort: {
          year: 1,
        },
      },
    ]),
  ]);

  const total_years = distinctYears.map((item) => item.year);

  // Initialize result object with all months set to 0
  const result = months.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});

  // Populate result with actual registration counts
  monthlyRegistration.forEach(({ month, count }) => {
    result[months[month - 1]] = count;
  });

  return {
    total_years,
    monthlyRegistration: result,
  };
};

const DashboardService = {
  totalOverview,
  getAllUser,
  getSingleUser,
  blockUnblockUser,
  growth,
};

module.exports = DashboardService;
