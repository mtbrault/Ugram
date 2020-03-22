require('dotenv').config();

const config = {
	app: {},
	api: {},
	db: {},
	jwt: {},
	google: {}
};

config.app.env             = process.env.APP || 'dev';
config.app.port            = process.env.PORT || '8080';
config.api.defaultPageSize = process.env.API_DEFAULT_PAGE_SIZE || '20';
config.api.maxPageSize     = process.env.API_MAX_PAGE_SIZE || '100';
config.db.dialect          = process.env.DB_DIALECT || 'mongodb';
config.db.host             = process.env.DB_HOST || 'mongo';
config.db.port             = process.env.DB_PORT || '27017';
config.db.name             = process.env.DB_NAME || 'ugram';
config.jwt.secret          = process.env.JWT_SECRET || 'kkIX7SDOnb67MmTgU5cvko4XaN2wqzQczii4GBBFYPW8xotJhTh4J2sGys6QHr76';
config.jwt.expiration      = process.env.JWT_EXPIRATION || '10000';
config.google.clientId     = process.env.GOOGLE_CLIENT_ID;

if(!config.google.clientId)
	throw new Error("google configuration missing");

module.exports = config;
