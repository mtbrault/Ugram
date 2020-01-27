require('dotenv').config();

const config = {
    app: {},
    db: {},
    jwt: {}
};

config.app.env          = process.env.APP || 'dev';
config.app.port         = process.env.PORT || '8080';
config.db.dialect       = process.env.DB_DIALECT || 'mongodb';
config.db.host          = process.env.DB_HOST || 'localhost';
config.db.port          = process.env.DB_PORT || '27017';
config.db.name          = process.env.DB_NAME || 'db';
config.jwt.secret       = process.env.JWT_SECRET || 'kkIX7SDOnb67MmTgU5cvko4XaN2wqzQczii4GBBFYPW8xotJhTh4J2sGys6QHr76';
config.jwt.expiration   = process.env.JWT_EXPIRATION || '10000';

module.exports = config;
