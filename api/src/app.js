const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');

const app = express();
const config = require("./config");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

console.log("Environnement:", config.app.env || "dev");


const router = require('./routes/v1');
app.use('/', router);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//request sink
app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

//error sink
app.use((err, req, res, next) => {
    if(!err.status) console.error(err);
    const json = config.app.env === "dev" ? {error: err} : {};
    json.message = err.message || "Something Broke...";
    res.status(err.status || 500).json(json);
});

module.exports = app
