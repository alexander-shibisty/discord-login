const express = require("express");
const server = express();
const port = require("./config.json").port;
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// mongoose connection URI
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("we're connected"))
  .catch((err) => console.log(err));

// json
server.use(express.json());
// session
server.use(
  session({
    secret: "xdb0",
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      expires: 1000000,
    },
  })
);

//setting express app to use /authorize middleware
server.use("/auth", require("./routes/oauth"));

// listen
server.listen(port, () => console.log(`Listening to port ${port}`));
