const { status } = require("http-status");

const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const Blog = require("./blog.model");
const validateFields = require("../../../util/validateFields");

const postBlog = async (req) => {
  const { files, body } = req;
  console.log(files);

  validateFields(files, ["blog_image"]);
  validateFields(body, ["title", "subTitle", "content", "author"]);

  const blogData = {
    title: body.title,
    subTitle: body.subTitle,
    content: body.content,
    blog_image: files.blog_image[0].path,
    author: body.author,
  };

  const result = await Blog.create(blogData);
  return result;
};

const getAllBlog = async (query) => {
  const blogQuery = new QueryBuilder(Blog.find({}), query)
    .search([])
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

const getSingleBlog = async (query) => {
  validateFields(query, ["blogId"]);

  const blog = await Blog.findById(query.blogId).lean();
  if (!blog) throw new ApiError(status.NOT_FOUND, "Blog not found");
  return blog;
};

const deleteSingleBlog = async (query) => {
  validateFields(query, ["blogId"]);

  const blog = await Blog.deleteOne({ _id: query.blogId });
  if (!blog.deletedCount)
    throw new ApiError(status.NOT_FOUND, "Blog not found");

  return blog;
};

const BlogService = {
  postBlog,
  getAllBlog,
  getSingleBlog,
  deleteSingleBlog,
};

module.exports = { BlogService };
