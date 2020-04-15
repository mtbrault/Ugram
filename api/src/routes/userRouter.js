const auth = require("../controllers/authController");
const user = require("../controllers/userController");
const { isValidUserId, isAdminOrLoggedUser } = require("../middlewares/validation");
const { extractPageParams, extractUserParams } = require("../middlewares/query");

const userRouter = (router) => {
	// ** Auth and User **
	router.get("/auth/tokeninfo", auth.tokeninfo);
	// ** User **
	router.get("/user", extractPageParams, extractUserParams, user.getAll); // R
	router.get("/self", user.get); // R
	router.get("/user/:id", isValidUserId("id"), user.getById); // R
	router.patch("/self", user.update); // U
	router.patch("/user/:id", isValidUserId("id"), isAdminOrLoggedUser, user.updateById); // U
	router.delete("/self", user.remove); // D
	router.delete("/user/:id", isValidUserId("id"), isAdminOrLoggedUser, user.removeById); // D
	return router;
};

module.exports = userRouter;
