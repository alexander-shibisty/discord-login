const {
  clientId,
  clientSecret,
  scopes,
  callbackUrl,
  proxyUrl,
  successUrl,
  failureUrl,
} = require("../config.json");
const router = require("express").Router();
const passport = require("passport");
const _ = require("lodash");
const Client = require("../models/clientModel");
const Link = require("../models/linkModel");

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
      Client.findOrCreate(profile, function (err, user) {
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

router.get("/save-link/:linkId", (req, res) => {
  const linkId = req.params.linkId;

  if (_.get(req.session, "passport.user")) {
    let profile = _.get(req.session, "passport.user");

    Link.find({ code: linkId })
      .exec()
      .then((response) => {
        Client.find({ _id: profile._id })
          .then((user) => {
            let links = _.get(user, "0.links");
            let checkValue = true;

            if (!links) {
              links = [];
            }

            for (let linkIndex in links) {
              let link = links[linkIndex];
              if (link === linkId) {
                checkValue = false;
                break;
              }
            }

            if (checkValue) {
              links.push(linkId);

              Client.findOneAndUpdate(
                { _id: profile._id },
                {
                  links: links,
                },
                function (err, obj) {
                  if (err) {
                    res.redirect(failureUrl);
                    return;
                  }

                  res.redirect(successUrl);
                }
              );
            } else {
              res.redirect(successUrl);
            }
          })
          .catch((error) => {
            res.redirect(failureUrl);
          });
      })
      .catch((error) => {
        res.redirect(failureUrl);
      });
  } else {
    res.redirect(failureUrl);
  }
});

module.exports = router;
