var express = require('express');
var router = express.Router();
const auth = require("./auth");
const discord = require("./discord");
const pay = require("./pay");

/* GET home page. */
router.use("/auth", auth);
router.use("/discord", discord);
router.use("/pay",pay);

module.exports = router;
