const { domain } = require("../config.json");
const router = require("express").Router();
const _ = require("lodash");
const Link = require("../models/linkModel");
const Client = require("../models/clientModel");
const randomString = require("../utils/randomString");

router.get("/links", (req, res) => {
  var userdata = _.get(req.session, "passport.user");

  if (userdata) {
    let user = userdata;

    Link.find({ userId: user._id })
      .exec()
      .then((result) => {
        res.status(200).json({
          data: result,
        });
      })
      .catch((error) => {
        res.status(403).json({
          authError: String(error),
        });
      });
  } else {
    res.status(403).json({
      authError: "User not authenticated",
    });
  }
});

router.post("/links", (req, res) => {
  var userdata = _.get(req.session, "passport.user");

  if (userdata) {
    let user = userdata;
    let linkPath = randomString(10);

    let link = new Link();
    link._id = linkPath + user._id;
    link.userId = user._id;
    link.code = linkPath;

    link.save(function (error) {
      if (error) {
        res.status(403).json({
          authError: String(error),
        });
        return;
      }

      Link.find({ userId: user._id })
        .exec()
        .then((result) => {
          res.status(200).json({
            data: result,
          });
        })
        .catch((error) => {
          res.status(403).json({
            authError: String(error),
          });
        });
    });
  } else {
    res.status(403).json({
      authError: "User not authenticated",
    });
  }
});

router.delete("/links/:linkId", (req, res) => {
  var userdata = _.get(req.session, "passport.user");

  if (userdata) {
    let user = userdata;
    let links = [];

    Link.remove({ _id: req.params.linkId })
      .then(() => {
        res.status(200).json({
          data: {},
        });
      })
      .catch(() => {
        res.status(403).json({
          authError: "User not authenticated",
        });
      });
  } else {
    res.status(403).json({
      authError: "User not authenticated",
    });
  }
});

router.get("/clients/:linkId", (req, res) => {
  var userdata = _.get(req.session, "passport.user");

  if (userdata) {
    let user = userdata;
    let clients = [];

    res.status(200).json({
      data: clients,
    });
  } else {
    res.status(403).json({
      authError: "User not authenticated",
    });
  }
});

router.delete("/clients/:linkId/:clientId", (req, res) => {
  var userdata = _.get(req.session, "passport.user");

  // if (userdata) {
  //   let user = userdata;
  //   // let links = [];

  //   Client.remove({ _id: req.params.clientId })
  //     .then(() => {
  //       res.status(200).json({
  //         data: {},
  //       });
  //     })
  //     .catch(() => {
  //       res.status(403).json({
  //         authError: "User not authenticated",
  //       });
  //     });
  // } else {
  //   res.status(403).json({
  //     authError: "User not authenticated",
  //   });
  // }
});

module.exports = router;
