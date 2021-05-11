
require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const slack_token = process.env.SLACK_TOKEN;

const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'FlamantBot',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: ['Agraelus', 'CzechCloud', 'PimpCSGO', 'ArcadeBulls', 'Freezecz', 'Astatoro', 'dafran',
  'Xnapycz', 'LexVeldhuis', 'Claina', 'Kokiii_', 'Patrikturi', 'STYKO', 'forsen', 'FlyGunCZ', 'Batmanova',
  'liveoliverr', 'Artix', 'resttpowered', 'Herdyn', 'spajKK', 'bladeito', 'marty_vole', 'KuruHS',
  'Mrtweeday', 'TenSterakdary', 'nikdohonehleda']
  
  //channels: ['MADMONQ', 'nikdohonehleda']
});

client.connect();
const web = new WebClient(slack_token);
const slack_channel_ID='C021720QLE8';

client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
    //if(self || !message.startsWith('!')) {
    if(self){
      return;
    }
   
  if((    message.toLowerCase().includes("madmonq") || 
    message.toLowerCase().includes("madmong") || 
    message.toLowerCase().includes("madmon") || 
    message.toLowerCase().includes("mekong")) && 
    (tags.username.toLowerCase() !== "nightbot" || tags.username.toLowerCase() !== "streamelements")
  )
  

 // if (message.toLowerCase().includes("!dabing"))
  {
    var msg_output = channel + "--> " + tags.username + ": " + message;
    //var msg_output = tags.username + ": " + message;
    console.log(msg_output);
    //client.say(channel, 'hueuhe');

    
    (async () => {

      // Post a message to the channel, and await the result.
      // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
      const result = await web.chat.postMessage({
        text: msg_output,
        channel: slack_channel_ID
      });
    
      // The result contains an identifier for the message, `ts`.
      console.log(`Successfully send message ${result.ts} in conversation ${slack_channel_ID}`);
    })();
    
 
  }

});






