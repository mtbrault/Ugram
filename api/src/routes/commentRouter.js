const comment = require("../controllers/commentController");
const {
	isValidUserId,
	isValidPostId,
	isValidCommentId,
	isAdminOrCommentAuthor,
} = require("../middlewares/validation");

const { extractPageParams } = require("../middlewares/query");

const commentRouter = (router) => {
	// ** Comment **
	router.post("/post/:id/comment", isValidPostId("id"), comment.create); // C
	router.get("/self/comment", extractPageParams, comment.getSelf); // R
	router.get("/user/:id/comment", isValidUserId("id"), extractPageParams, comment.getByUser); // R
	router.get("/post/:id/comment", isValidPostId("id"), extractPageParams, comment.getByPost); // R
	router.get("/comment/:id", isValidCommentId("id"), comment.getById); // R
	router.patch("/comment/:id", isValidCommentId("id"), isAdminOrCommentAuthor, comment.update); // U
	router.delete("/comment/:id", isValidCommentId("id"), isAdminOrCommentAuthor, comment.remove); // D
	return router;
};

module.exports = commentRouter;
