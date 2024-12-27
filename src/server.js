const { errorLogger, logger } = require("./shared/logger");
const connectDB = require("./connection/connectDB");
const config = require("./config");
const app = require("./app");

async function main() {
  try {
    await connectDB();
    logger.info(`DB Connected Successfully at ${new Date().toLocaleString()}`);

    app.listen(config.port, config.base_url, () => {
      logger.info(`App listening on http://${config.base_url}:${config.port}`);
    });

    process.on("unhandledRejection", (error) => {
      logger.error("Unhandled Rejection:", error);
    });

    process.on("uncaughtException", (error) => {
      errorLogger.error("Uncaught Exception:", error);
    });

    process.on("SIGTERM", () => {
      logger.info("SIGTERM received");
    });
  } catch (err) {
    errorLogger.error("Main Function Error:", err);
  }
}

main();
