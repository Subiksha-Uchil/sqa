const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
app.use(bodyParser.json({ limit: "1gb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1gb" }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route imports
const profile = require("./routes/profileRoute");
const users = require("./routes/userRoute");

app.use("/api/v1", profile);
app.use("/api/v1", users);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
