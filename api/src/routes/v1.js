const express = require("express");
const passport = require("passport");

require("../middlewares/passport")(passport);

const router = new express.Router();

// ** Banner **
router.get("/", (req, res) => {
	res.status(200).json({
		status: "success",
		message: "Welcome to ugram API",
		data: { version: "v1.0.1" },
	});
});

const baseRouter = require("./baseRouter");
const authRouter = new express.Router();
authRouter.use(passport.authenticate("jwt", { session: false }));
require("./userRouter")(authRouter);
require("./postRouter")(authRouter);
require("./commentRouter")(authRouter);
require("./notificationRouter")(authRouter);

router.use(baseRouter);
router.use(authRouter);

module.exports = router;
