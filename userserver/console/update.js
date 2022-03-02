const Client = require("../models/clientModel");
// import { axios } from "axios";
const mongoose = require("mongoose");
require("dotenv").config();
const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const _ = require("lodash");
const axios = require("axios");
// mongoose connection URI
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("we're connected"))
  .catch((err) => console.log(err));

console.log("Started");

Client.find({})
  .exec()
  .then((clients) => {
    if (clients) {
      for (let clientIndex in clients) {
        let client = clients[clientIndex];
        let accessToken = _.get(client, "accessToken");

        axios
          .get("http://discordapp.com/api/users/@me", {
            headers: {
              Authorization: accessToken,
            },
          })
          .then((response) => {
            // console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(accessToken);
      }
    }
  })
  .catch((error) => {
    console.log(error);
  });
