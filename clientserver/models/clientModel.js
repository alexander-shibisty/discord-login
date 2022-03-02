const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const _ = require("lodash");

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

clientScheme.statics.findOrCreate = function findOrCreate(profile, cb) {
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

    if (!result) {
      clientObj.links = [];

      clientObj.save(cb);
    } else {
      _this
        .find({ _id: profile.id })
        .then((user) => {
          let links = _.get(user, "0.links");

          _this.findOneAndUpdate(
            { _id: profile.id },
            {
              links: links,
            },
            function (err, obj) {
              if (err) {
                cb(err, obj);
                return;
              }

              cb(null, obj);
            }
          );
        })
        .catch((error) => {
          cb(error, clientObj);
        });
    }
  });
};

const Client = mongoose.model("Client", clientScheme);

module.exports = Client;
