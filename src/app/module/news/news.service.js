const { status } = require("http-status");

const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const Blog = require("./news.model");
const validateFields = require("../../../util/validateFields");

const postNews = async (req) => {
  const { files, body } = req;

  validateFields(files, ["blog_image"]);
  validateFields(body, ["title", "content", "author"]);

  const blogData = {
    title: body.title,
    content: body.content,
    author: body.author,
    blog_image: files.blog_image[0].path,
  };

  const result = await Blog.create(blogData);
  return result;
};

const getAllNews = async (query) => {
  const blogQuery = new QueryBuilder(Blog.find({}), query)
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    blogQuery.modelQuery,
    blogQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getSingleNews = async (query) => {
  validateFields(query, ["blogId"]);

  const blog = await Blog.findById(query.blogId).lean();
  if (!blog) throw new ApiError(status.NOT_FOUND, "Blog not found");
  return blog;
};

const deleteSingleNews = async (query) => {
  validateFields(query, ["blogId"]);

  const blog = await Blog.deleteOne({ _id: query.blogId });
  if (!blog.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Blog not found");

  return blog;
};

const BlogService = {
  postNews,
  getAllNews,
  getSingleNews,
  deleteSingleNews,
};

module.exports = { BlogService };
