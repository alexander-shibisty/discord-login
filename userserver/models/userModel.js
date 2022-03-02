const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    _id: String,
    username: String,
    avatar: String,
    discriminator: String,
    public_flags: Number,
    flags: Number,
    banner: String,
    banner_color: String,
    accent_color: String,
    locale: String,
    mfa_enabled: Boolean,
    email: String,
    verified: Boolean,
    provider: String,
    accessToken: String,
    guilds: Array,
    fetchedAt: String,
  },
  { versionKey: false }
);

userScheme.statics.findOrCreate = function findOrCreate(profile, cb) {
  let userObj = new this();
  let _this = this;

  _this.findOne({ _id: profile.id }, function (err, result) {
    if (err) {
      cb(err, result);
      return;
    }

    userObj._id = profile.id;
    userObj.username = profile.username;
    userObj.avatar = profile.avatar;
    userObj.discriminator = profile.discriminator;
    userObj.public_flags = profile.public_flags;
    userObj.flags = profile.flags;
    userObj.banner = profile.banner;
    userObj.banner_color = profile.banner_color;
    userObj.accent_color = profile.accent_color;
    userObj.locale = profile.locale;
    userObj.mfa_enabled = profile.mfa_enabled;
    userObj.email = profile.email;
    userObj.verified = profile.verified;
    userObj.provider = profile.provider;
    userObj.accessToken = profile.accessToken;
    userObj.guilds = profile.guilds;
    userObj.fetchedAt = profile.fetchedAt;

    if (!result) {
      userObj.save(cb);
    } else {
      _this.findOneAndUpdate({ _id: profile.id }, userObj, function (err, obj) {
        cb(err, obj);
      });
    }
  });
};

const User = mongoose.model("User", userScheme);

module.exports = User;
