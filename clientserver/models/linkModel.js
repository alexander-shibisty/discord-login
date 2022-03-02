const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkScheme = new Schema(
  {
    _id: String,
    userId: String,
    code: String,
  },
  { versionKey: false }
);

const Link = mongoose.model("Link", linkScheme);

module.exports = Link;
