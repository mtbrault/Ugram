const { ExtractJwt, Strategy } = require('passport-jwt');
const { User } = require('../db');
const config = require('../config');
const { to } = require('./utils');

module.exports = function(passport){
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret
    };

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        if (!jwt_payload.id)
            return done(new Error("no id field in token"), false);
        const [err, user] = await to(User.findById(jwt_payload.id));
        if(err)
            return done(err, false);
        return done(null, user ? user : false);
    }));
}
