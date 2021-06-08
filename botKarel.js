
require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const slack_token = process.env.SLACK_TOKEN;
const request = require("request");
const async = require("async");
var accessToken = '';
const tmi = require('tmi.js');



class slackMessage {
    constructor(text, id){
        this.text = text;
        this.id = id;
    }
}

const options = {
  url: 'https://id.twitch.tv/oauth2/token',
  json:true,
  body: {
  client_id: process.env.TWITCH_BOT_KAREL_ID,
  client_secret: process.env.TWITCH_BOT_KAREL_SECRET,
  grant_type: 'client_credentials'
  }
};

const client = new tmi.Client({
  options: { debug: false },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'BanyMiJdouKarel',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: ['hryminejdoukerol', 'nikdohonehleda']
  
  //channels: ['MADMONQ', 'nikdohonehleda']
});


client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
    //if(self || !message.startsWith('!')) {
    if(self){
        return;
    }
    
    if(message.toLowerCase().includes("!test")){
        client.say(channel, 'hueuheuheu');
        //client.say(channel, 'hueuhe');
    }

});

console.log("konec, jedem async");


 




