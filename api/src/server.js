/* eslint-disable no-console */
(async () => {
	const pe = require("parse-error");
	const config = require("./config");
	let srvLoaded = false;
	let dbLoaded = false;

	process
		.on("SIGTERM", sighandler)
		.on("SIGINT", sighandler)
		.on("uncaughtException", (err) => {
			const { filename, line, row, message, type, stack } = pe(err);
			console.error(
				`Uncaught Exception (${type || "unknown type"}): ${
					message || ""
				}\n\tin ${filename}:${line}:${row}\nStack:\n${stack}`,
			);
			shutdown(true);
		})
		.on("unhandledRejection", (reason, p) => {
			console.error("Unhandled Rejection at:", p, "reason:", reason);
			shutdown(true);
		});

	const db = require("./db");
	db.connection.on("error", console.error.bind(console, "Db connection error:"));

	await new Promise((resolve) => {
		db.connection.once("open", () => {
			dbLoaded = true;
			resolve();
		});
	});

	const app = require("./app");
	const port = checkPort(config.app.port) || 8080;
	const srv = app.listen(port, () => {
		console.log(`Listening on port ${port}`);
	});
	srvLoaded = true;

	function sighandler(sig) {
		console.info(`Signal ${sig} received.`);
		shutdown(false);
	}

	function shutdown(err) {
		console.log("Closing http server...");
		if (srvLoaded) {
			srv.close(() => {
				console.log("Server closed.");
				db.connection.close(false, () => {
					console.log("MongoDB connection closed.");
					process.exit(err ? 1 : 0);
				});
			});
		} else if (dbLoaded) {
			db.connection.close(false, () => {
				console.log("MongoDB connection closed.");
				process.exit(err ? 1 : 0);
			});
		}
	}

	function checkPort(value) {
		const res = parseInt(value, 10);
		return isNaN(res) || res <= 0 ? false : res;
	}
})();
