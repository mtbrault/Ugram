const axios = require('axios');
const { OAuth2Client } = require('google-auth-library');
const { User } = require("../db");
const { to, terr } = require('../middlewares/utils');
const { google } = require('../config');

const client = new OAuth2Client(google.clientId);

const create = async accessToken => {
	const [err, res] = await to(axios.get(
		"https://www.googleapis.com/userinfo/v2/me",
		{
			headers: {
				'Authorization': "Bearer " + accessToken
			}
		},
	));
	if (err)
		terr("Invalid accessToken", 400);
	if(!res.data || !res.data.id || !res.data.email)
		terr("Bad response from google", 500);
	const username = "user" + res.data.id;
	const user = new User({
		username,
		displayname: username,
		googleId: res.data.id,
		firstname: res.data.given_name,
		lastname: res.data.family_name,
		email: res.data.email,
		profilePic: res.data.picture
	});
	await user.save();
	return user;
}

const authenticate = async ({ accessToken, tokenId }) => {
	if(!accessToken || !tokenId)
		terr("missing accessToken or tokenId field", 400);
	const ticket = await client.verifyIdToken({ idToken: tokenId, audience: CLIENT_ID });
	const payload = ticket.getPayload();
	const userId = payload['sub'];
	let created = false;
	let user = await User.findOne({"googleId": userId});
	if(!user) {
		user = await create(accessToken);
		created = true;
	}
	return { user, created };
};

module.exports = {
	authenticate
}
