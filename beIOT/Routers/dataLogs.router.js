const express = require("express");
const router = express.Router();

const controller = require("../Controller/dataLogs.controller");

router.get("/",controller.index);

router.get("/linechart",controller.linechart);

router.get("/count",controller.count);

module.exports = router;