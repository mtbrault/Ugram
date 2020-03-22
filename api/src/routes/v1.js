const express = require('express');
const passport = require('passport');

require('../middlewares/passport')(passport);

const router = express.Router();

// ** Banner **
router.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to ugram API",
        data: { version: "v0.0.1" }
    })
});

const baseRouter = require('./baseRouter');
const authRouter = express.Router();
authRouter.use(passport.authenticate('jwt', {session:false}));
require('./userRouter')(authRouter);
require('./postRouter')(authRouter);

router.use(baseRouter);
router.use(authRouter);

module.exports = router;
