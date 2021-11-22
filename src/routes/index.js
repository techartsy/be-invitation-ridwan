const express = require("express");
const giftRoutes = require("./gift");
const adminRoutes = require("./admin");
const guestRoutes = require("./guest");
const router = express.Router();

router.use("/gift", giftRoutes);
router.use("/admin", adminRoutes);
router.use("/guest", guestRoutes);

module.exports = router;
