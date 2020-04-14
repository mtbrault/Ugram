const post = require("../controllers/postController");
const {
	isValidUserId,
	isAdminOrLoggedUser,
	isValidPostId,
	isAdminOrPostAuthor,
} = require("../middlewares/validation");
const { extractPageParams, extractPostParams, extractDateParams } = require("../middlewares/query");

const postRouter = (router) => {
	// ** Post **
	router.post("/post", post.upload); // C
	router.post("/user/:id/post", isValidUserId("id"), isAdminOrLoggedUser, post.uploadForUser); // C
	router.get("/post", extractPageParams, extractPostParams, post.getAll); // R
	router.get("/self/post", extractPageParams, post.getSelf); // R
	router.get("/user/:id/post", isValidUserId("id"), extractPageParams, post.getByUser); // R
	router.get("/post/:id", isValidPostId("id"), post.getById); // R
	router.get("/keyword", extractPageParams, extractDateParams, post.getKeyword);
	router.patch("/post/:id", isValidPostId("id"), isAdminOrPostAuthor, post.update); // U
	router.delete("/post/:id", isValidPostId("id"), isAdminOrPostAuthor, post.remove); // D
	return router;
};

module.exports = postRouter;
