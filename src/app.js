const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middleware/globalErrorHandler");
const routes = require("./app/routes");
const NotFoundHandler = require("./error/NotFoundHandler");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: ["http://10.0.60.44:3002"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/", routes);

app.get("/", async (req, res) => {
  res.json("Welcome to HereToHalp");
});

app.use(globalErrorHandler);
app.use(NotFoundHandler.handle);

module.exports = app;
