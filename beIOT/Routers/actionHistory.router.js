const express = require("express");
const router = express.Router();

const controller = require("../Controller/actionHistory.controller");

router.get("/",controller.index);

router.post("/put",controller.put);

router.get("/check",controller.check);



module.exports = router;