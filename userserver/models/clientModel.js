const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientScheme = new Schema(
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
    links: Array,
  },
  { versionKey: false }
);

clientScheme.statics.findOrCreate = function findOrCreate(profile, link, cb) {
  let clientObj = new this();
  let _this = this;

  _this.findOne({ _id: profile.id }, function (err, result) {
    if (err) {
      cb(err, result);
      return;
    }

    clientObj._id = profile.id;
    clientObj.username = profile.username;
    clientObj.avatar = profile.avatar;
    clientObj.discriminator = profile.discriminator;
    clientObj.public_flags = profile.public_flags;
    clientObj.flags = profile.flags;
    clientObj.banner = profile.banner;
    clientObj.banner_color = profile.banner_color;
    clientObj.accent_color = profile.accent_color;
    clientObj.locale = profile.locale;
    clientObj.mfa_enabled = profile.mfa_enabled;
    clientObj.email = profile.email;
    clientObj.verified = profile.verified;
    clientObj.provider = profile.provider;
    clientObj.accessToken = profile.accessToken;
    clientObj.guilds = profile.guilds;
    clientObj.fetchedAt = profile.fetchedAt;
    clientObj.links = [link];

    if (!result) {
      clientObj.save(cb);
    } else {
      _this.findOneAndUpdate(
        { _id: profile.id },
        clientObj,
        function (err, obj) {
          cb(err, obj);
        }
      );
    }
  });
};

const Client = mongoose.model("Client", clientScheme);

module.exports = Client;
