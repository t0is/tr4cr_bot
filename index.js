
require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const slack_token = process.env.SLACK_TOKEN;
const request = require("request");
const async = require("async");
var accessToken = '';
const tmi = require('tmi.js');

var liveChannels = [''];

var channelsList = ['Agraelus', 'CzechCloud', 'PimpCSGO', 'ArcadeBulls', 'Freezecz', 'Astatoro', 'dafran',
  'Xnapycz', 'LexVeldhuis', 'Claina', 'Kokiii_', 'Patrikturi', 'STYKO', 'forsen', 'FlyGunCZ', 'Batmanova',
  'liveoliverr', 'Artix', 'resttpowered', 'Herdyn', 'spajKK', 'bladeito', 'marty_vole', 'KuruHS',
  'Mrtweeday', 'TenSterakdary', 'nikdohonehleda'];


  var botIgnore = ['oliveruvotrok', 'nightbot', 'streamelements', 'botalfr3d'];

const options = {
  url: 'https://id.twitch.tv/oauth2/token',
  json:true,
  body: {
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
  grant_type: 'client_credentials'
  }
};

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
  channels: channelsList
  
  //channels: ['MADMONQ', 'nikdohonehleda']
});


function liveRequest(accessToken){

  channelsList.forEach(streamName => {
        streamName = streamName.replace('#', '');
   
    setTimeout(() => {
      const streamOptions = {
          url: 'https://api.twitch.tv/helix/streams?user_login=' + streamName.toLowerCase(),
          method: 'GET',
          headers:{
              'Client-ID': process.env.TWITCH_CLIENT_ID,
              'Authorization': 'Bearer ' + accessToken
          }
      }
      if(!accessToken){
          console.log("No Token");
      }else{
          //console.log(streamOptions);
      
      const liveRequest = request.get(streamOptions,(err,res,body) => {
          if(err){
              return console.log(err);
          }
          
          //console.log('Status: ${res.statusCode}');
          
          try{
            //console.log(JSON.parse(body).data[0].user_name + " " +JSON.parse(body).data[0].type);
            if (!liveChannels.includes(JSON.parse(body).data[0].user_name)){
              liveChannels.push(JSON.parse(body).data[0].user_name);

              (async () => {
                var msg_output = JSON.parse(body).data[0].user_name + " is now live on Twitch.";
                // Post a message to the channel, and await the result.
                // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
                const result = await web.chat.postMessage({
                  text: msg_output,
                  channel: slack_online_update
                });
              
                // The result contains an identifier for the message, `ts`.
                console.log(`Successfully send message ${result.ts} in conversation ${slack_channel_ID}`);
              })();
              
              //console.log('pagman')
              //slack notif 
            }
          
            //console.log('parsnul jsem body'); 
            //return JSON.parse(body).data[0].type === 'live';
          }
          catch (e) {
            liveChannels = liveChannels.filter(item => item !== streamName)
            //return null;
          }
        });
      
      };
    },2000);
    

  });
}





client.connect();
const web = new WebClient(slack_token);
const slack_channel_ID = 'C021720QLE8';
const slack_online_update = 'C0225846R9B';


client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
    //if(self || !message.startsWith('!')) {
    if(self){
      return;
    }
    
    request.post(options, (err,res,body)=>{
      if(err){
          return console.log(err);
      }
      
      liveRequest(body.access_token)
      
    });

  if((    message.toLowerCase().includes("madmonq") || 
    message.toLowerCase().includes("madmong") || 
    message.toLowerCase().includes("madmon") || 
    message.toLowerCase().includes("mekong")) && 
    (!botIgnore.includes(tags.username.toLowerCase()))
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






//console.log(liveChannels);
    


 

 




