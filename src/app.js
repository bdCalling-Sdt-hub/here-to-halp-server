const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middleware/globalErrorHandler");
const routes = require("./app/routes");
const NotFoundHandler = require("./error/NotFoundHandler");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: [
      "http://10.0.60.44:3002",
      "http://10.0.60.44:3005",
      "http://10.0.60.44:3004",
      "http://206.81.11.36:4173",
      "http://206.81.11.36:4174",
      "https://blackeagletechsolutions.com",
      "https://admin.blackeagletechsolutions.com",
      "http://10.0.60.44:3004",
      "https://just-client-vercel-heretohelp.vercel.app",
      "http://159.65.217.35:4173",
      "http://159.65.217.35:4174",
    ],
    // origin: "*",
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
