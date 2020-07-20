var path = require("path");
var express = require("express");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
var app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// const bootcamps = require('./routes/Bootcamps')
// const courses = require('./routes/Courses')
const auth = require("./routes/auth");
const categories = require("./routes/category");
// const reviews = require('./routes/Reviews')
const cors = require("cors");
// const mongoSanitize = require('express-mongo-sanitize');
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// var xss = require('xss-clean')
// var hpp = require('hpp');

// const errorHandler = require('./middleware/error')
const mongoose = require("mongoose");
// const fileupload = require('express-fileupload')
// app.use(mongoSanitize());
// app.use(helmet());
// console.log('fff')

// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000,
//     max: 100
// });

const Url = `${process.env.SRV}`;
mongoose.connect(
  Url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log("connected");
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(xss());
// app.use(limiter);
// app.use(hpp())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Acces-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Acces-Control-Allow-Methods", "PUT,PATCH,POST,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
// app.use(fileupload())
app.use("/api/users", auth);
app.use("/api/categories", categories);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
