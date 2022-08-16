const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const morgan = require("morgan");
const winston = require("./logger");

const corsConfig = require("./config/cors");
const bodyParserConfig = require("./config/bodyParser");
const authenticateUser = require("./middlewares/authentication");
require("./db");

const errorHandler = require("./errors/handler/handler");
const authRoutes = require("./routes/auth/authRoutes");
const userRoutes = require("./routes/user/userRoutes");
const categoryRoutes = require("./routes/category/categoryRoutes");

const app = express();

app.use(cors(corsConfig));
app.use(bodyParser.json(bodyParserConfig));
app.use(cookieParser());
app.use(morgan("combined", { stream: winston.stream }));

app.use("/auth", authRoutes);
app.use("/user", authenticateUser, userRoutes);
app.use("/category", authenticateUser, categoryRoutes);

app.use(errorHandler);

module.exports = app;
