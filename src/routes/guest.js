const express = require("express");
const { guests, guest, regist, deleteGuest } = require("../controllers/guest");
const authentication = require("../middlewares/auth");
const router = express.Router();

router.get("/", guests);
router.get("/:id", guest);
router.post("/", regist);
router.use(authentication);
router.delete("/delete/:id", deleteGuest);

module.exports = router;
