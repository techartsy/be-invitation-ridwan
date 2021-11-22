const express = require("express");
const router = express.Router();
const { adminReg, login } = require("../controllers/admin");
// const auth = require("../middlewares/auth");

router.post("/register", adminReg);
router.post("/login", login);

module.exports = router;
