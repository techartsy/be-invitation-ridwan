const express = require("express");
// const giftRoutes = require("./gift");
// const adminRoutes = require("./admin");
// const guestRoutes = require("./guest");
const router = express.Router();
const { gifts, addGift, deleteGift, gift } = require("../controllers/gift");
const { guests, guest, regist, deleteGuest } = require("../controllers/guest");
const { adminReg, login } = require("../controllers/admin");

// gift
router.get("/gift/", gifts);
router.get("/gift/:id", gift);
router.post("/gift/", addGift);

// guest
router.get("/guest/", guests);
router.get("/guest/:id", guest);
router.post("/guest/", regist);

// admin
router.post("/admin/register", adminReg);
router.post("/admin/login", login);

// Guarded Route
router.use(authentication);
router.delete("/gift/delete/:id", deleteGift);
router.delete("/guest/delete/:id", deleteGuest);

// router.use("/gift", giftRoutes);
// router.use("/admin", adminRoutes);
// router.use("/guest", guestRoutes);

module.exports = router;
