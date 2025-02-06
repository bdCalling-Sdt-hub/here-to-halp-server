const { status } = require("http-status");

const ApiError = require("../../../error/ApiError");
const QueryBuilder = require("../../../builder/queryBuilder");
const News = require("./news.model");
const validateFields = require("../../../util/validateFields");

const postNews = async (req) => {
  const { files, body } = req;

  validateFields(files, ["news_image"]);
  validateFields(body, ["title", "content", "author"]);

  const newsData = {
    title: body.title,
    content: body.content,
    author: body.author,
    news_image: files.news_image[0].path,
  };

  const result = await News.create(newsData);
  return result;
};

const getAllNews = async (query) => {
  const newsQuery = new QueryBuilder(News.find({}), query)
    .search(["title", "content", "author"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const [result, meta] = await Promise.all([
    newsQuery.modelQuery,
    newsQuery.countTotal(),
  ]);

  return {
    meta,
    result,
  };
};

const getSingleNews = async (query) => {
  validateFields(query, ["newsId"]);

  const news = await News.findById(query.newsId).lean();
  if (!news) throw new ApiError(status.NOT_FOUND, "news not found");

  return news;
};

const deleteSingleNews = async (query) => {
  validateFields(query, ["newsId"]);

  const news = await News.deleteOne({ _id: query.newsId });
  if (!news.deletedCount)
    throw new ApiError(status.NOT_FOUND, "news not found");

  return news;
};

const newsService = {
  postNews,
  getAllNews,
  getSingleNews,
  deleteSingleNews,
};

module.exports = { newsService };
