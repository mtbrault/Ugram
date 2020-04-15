/* eslint-disable no-console */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const passport = require("passport");

const app = express();
const config = require("./config");

const CORS_OPTIONS = {
	Origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	credentials: true,
};

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));

app.use(passport.initialize());

console.log("Environnement:", config.app.env || "dev");

app.all("/", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

const router = require("./routes/v1");
app.use("/", router);

// Request sink
app.use((req, res, next) => {
	const err = new Error("Not found");
	err.status = 404;
	next(err);
});

// Error sink
app.use((err, req, res, _next) => {
	if (!err.status) console.error(err);
	const json = config.app.env === "dev" ? { error: err } : {};
	json.message = err.message || "Something Broke...";
	res.status(err.status || 500).json(json);
});

module.exports = app;
