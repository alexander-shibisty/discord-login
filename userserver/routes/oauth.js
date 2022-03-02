const {
  clientId,
  clientSecret,
  scopes,
  callbackUrl,
  proxyUrl,
} = require("../config.json");
const router = require("express").Router();
const passport = require("passport");
const _ = require("lodash");
const User = require("../models/userModel");
const Client = require("../models/clientModel");

const DiscordStrategy = require("passport-discord").Strategy;

passport.use(
  new DiscordStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: callbackUrl,
      scope: scopes,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(profile, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
  });
});

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  function (req, res) {
    res.redirect(proxyUrl);
  }
);

router.get("/logout", (req, res) => {
  if (_.get(req.session, "passport.user")) {
    req.session.destroy(function (err) {
      res.redirect(proxyUrl);
    });
    return;
  }

  res.redirect(proxyUrl);
});

router.get("/getUserData", (req, res) => {
  if (!_.get(req.session, "passport.user")) {
    res.json({
      login: false,
    });
  } else {
    let username = _.get(req.session, "passport.user.username");
    res.json({
      login: true,
      username: username,
    });
  }
});

module.exports = router;
