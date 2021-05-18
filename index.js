require('dotenv').config();
const request = require('request');

const { ApiClient } = require('twitch');
const { RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');
const clientId = process.env.TWITCH_CLIENT_ID;
const accessToken = process.env.TWITCH_ACCESS_TOKEN;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const refreshToken = '999999';
const authProvider = new RefreshableAuthProvider(new StaticAuthProvider(clientId, accessToken), {
    clientSecret,
    refreshToken,
    onRefresh: (token) => {
        // do things with the new token data, e.g. save them in your database
    }
});
const apiClient = new ApiClient({ authProvider });

let userName = 'herdyn'

async function isStreamLive(userName) {
	const user = await apiClient.helix.users.getUserByName(userName);
  console.log(user);
	if (!user) {
		return false;
	}
	return await user.getStream() !== null;
}
