const express = require("express");
const router = new express.Router();
const auth = require("../controllers/authController");

router.post("/auth/google", auth.google);
router.post("/auth/login", auth.login);
router.post("/auth/register", auth.register);

module.exports = router;
