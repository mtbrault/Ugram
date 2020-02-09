const express = require('express');
const passport = require('passport');

const router = express.Router();
// const auth = require('../controllers/authController');
const user = require('../controllers/userController');


require('../middlewares/passport')(passport);

// ** Banner **
router.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to ugram API",
        data: { version: "v0.0.1" }
    })
});

// ** Auth **
// router.post('/auth/google', auth.google);
// router.post('/auth/twitter', auth.twitter);
// router.post('/auth/reddit', auth.reddit);
// router.post('/auth/microsoft', auth.microsoft);
router.get('/tokeninfo', passport.authenticate('jwt', {session:false}), auth.tokeninfo);

// ** Auth and User **
router.post('/auth/login', user.login);
router.post('/auth/register', user.register);                                         //C

// ** User **
router.get('/user', passport.authenticate('jwt', {session:false}), user.get);         //R
router.get('/user/:id', passport.authenticate('jwt', {session:false}), user.getById);         //R
//router.put('/user', passport.authenticate('jwt', {session:false}), user.update);    //U
router.delete('/user', passport.authenticate('jwt', {session:false}), user.remove);   //D
router.delete('/user/:id', passport.authenticate('jwt', {session:false}), user.removeById);   //D

// ** Services **
// router.post('/user/google', passport.authenticate('jwt', {session:false}), user.google);       //C
// router.post('/user/twitter', passport.authenticate('jwt', {session:false}), user.twitter);     //C
// router.post('/user/reddit', passport.authenticate('jwt', {session:false}), user.reddit);       //C
// router.post('/user/microsoft', passport.authenticate('jwt', {session:false}), user.microsoft); //C
// router.get('/user/services', passport.authenticate('jwt', {session:false}), user.services)     //R


module.exports = router;
