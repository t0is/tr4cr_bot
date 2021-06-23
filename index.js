
require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const slack_token = process.env.SLACK_TOKEN;
const request = require("request");
const async = require("async");
var accessToken = '';
const tmi = require('tmi.js');

var liveChannels = [];


var streamersCZ = ['Agraelus', 'CzechCloud', 'ArcadeBulls', 'Freezecz', 
'Astatoro', 'Xnapycz','Claina', 'Kokiii_', 'Patrikturi', 'STYKO', 'FlyGunCZ', 'Batmanova', 
'liveoliverr', 'Artix', 'resttpowered', 'Herdyn', 'spajKK', 'bladeito', 'marty_vole', 
'TenSterakdary', 'nikdohonehleda'].map(v => v.toLowerCase());

var streamersEN = ['PimpCSGO', 'dafran', 'LexVeldhuis', 'Mrtweeday', 'forsen', 'KuruHS', 'quickgabi', 'blastpremier'].map(v => v.toLowerCase());
var streamersDE = ['papaplatte', 'revedtv', 'mirza_jahic', 'rewinside', 'maxim', 'TolkinLOL', 'Vlesk'].map(v => v.toLowerCase()); 
var streamersFR = ['Kaydop', 'Ponce', 'Locklear', 'AlfaCast', 'Valouzz', 'kamet0', 'shaunz'].map(v => v.toLowerCase());





//var channelsList = ['nikdohonehleda'];

var botIgnore = ['oliveruvotrok', 'nightbot', 'streamelements', 'botalfr3d', 'madmonkeyv2'];


var messageLog = [];


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
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
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
    username: 'FlamantBot',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: channelsList
  
  //channels: ['MADMONQ', 'nikdohonehleda']
});

const fetch = require("node-fetch");
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
//const herokuApp = process.env.HEROKU_APP || null;
const youtubeFetchTimeout = 1500000;

const web = new WebClient(slack_token);
const slack_channel_ID = 'C021720QLE8';
const slack_online_update = 'C0225846R9B';


///////TEST TEST TEST///////

//const slack_channel_ID = 'C022500TU15';
//const slack_online_update = 'C022500TU15';

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video';
//const discordApiKey = process.env.DISCORD_API_KEY;
//const discordApiUrl = `https://discordapp.com/api/webhooks/${discordApiKey}`;

const youtubeChannels = [
    {
        channelName: 'DuklockPlus',
        channelId: 'UCIAbC7emlDQs-dmgW4GlgnA',
        channelUrl: 'https://www.youtube.com/channel/UCIAbC7emlDQs-dmgW4GlgnA'
    },
    {
      channelName: 'Sterakdary',
      channelId: 'UCYsS3SON69FIr-K3E3Czvpw',
      channelUrl: 'https://www.youtube.com/channel/UCYsS3SON69FIr-K3E3Czvpw'
    },
    {
      channelName: 'BLASTPremier YOUTUBE',
      channelId: 'UC9k--dE_UE0Faxzgb_DDkYQ',
      channelUrl: 'https://www.youtube.com/channel/UC9k--dE_UE0Faxzgb_DDkYQ'
      
    }
];

let activeLiveStreams = new Set();








function liveRequest(accessToken){

  channelsList.forEach(streamName => {
        streamName = streamName.replace('#', '');
   
    
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
            //console.log(res);
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
                console.log(`Successfully send message ${result.ts} in conversation ${slack_online_update}`);
              })();
              
              //console.log('pagman')
              //slack notif 
            }
            else {
              console.log("furt stejni live: " + liveChannels);
            }
          
            //console.log('parsnul jsem body'); 
            //return JSON.parse(body).data[0].type === 'live';
          }
          catch (e) {
            liveChannels = liveChannels.filter(item => item !== streamName)
            //console.log("ZMENAZMENAZMENAZMENAZMENA: " + liveChannels);
            //return null;
          }
        });
      
      };
    
    

  });
}

/////////////////////////////////////////////


async function fetchLiveStreamStatus() {
    try {
         for(const youtubeChannel of youtubeChannels) {
            //const youtubeChannel = youtubeChannels[0];
            console.log('Polling for ', JSON.stringify(youtubeChannel));
            const url = `${youtubeApiUrl}&channelId=${youtubeChannel.channelId}&key=${youtubeApiKey}`;
            const response = await fetch(url);
            const myJson = await response.json();
            
            console.log('YouTube Response', JSON.stringify(myJson));
            if(myJson && myJson.pageInfo && myJson.pageInfo.totalResults > 0) {
                console.log('Found active stream for ', youtubeChannel.channelId);
                myJson.items.forEach(element => {
                    if(!activeLiveStreams.has(element.id.videoId)) {
                        console.log(element);
                        activeLiveStreams.add(element.id.videoId);
                        if (!liveChannels.includes(youtubeChanel.channelName)){
                            liveChannels.push(youtubeChanel.channelName);
                            (async () => {
                            var msg_output = youtubeChanel.channelName + "is now live on YouTube.";
                            // Post a message to the channel, and await the result.
                            // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
                            const result = await web.chat.postMessage({
                                text: msg_output,
                                channel: slack_online_update
                            });
                            console.log(`Successfully send message in conversation ${slack_online_update}`);
                            })();
                        

                        }
                    } else {
                        console.log(`Already alerted for this livestream ${element.id.videoId}. Skipping.`);
                    }
                });
            }
            else {
              console.log (youtubeChanel.channelName + 'not active now');
              liveChannels = liveChannels.filter(item => item !== dukName);
            }
         }
    } catch (error) {
        console.error(error);
    }
}














app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
    setInterval(fetchLiveStreamStatus, youtubeFetchTimeout);

    // check jestli je live
    setInterval(() => {
    request.post(options, (err,res,body)=>{
        if(err){
            return console.log(err);
        }
        
        liveRequest(body.access_token);
        //connectToAllLiveChannels();
        //console.log(res);
        
      });
    },5000);
})


client.connect();


client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
    //if(self || !message.startsWith('!')) {
    if(self){
      return;
    }
    

    if(tags.username.toLowerCase() === "madmonq"){

        var sent = false;
        var uname = message.split(' ')[0].replace('@', '');
        
        messageLog.every(function(msgL){

            if(msgL.text.toLowerCase().includes(uname.toLowerCase())){


                (async () => {

                  var slID = getSlackChannelID(channel.replace('#', '').toLowerCase());
                  const result = await web.chat.postMessage({
                    text: tags.username + ": " + message,
                    channel: slID,
                    thread_ts: msgL.id
                  });
                
                  // The result contains an identifier for the message, `ts`.
                  console.log(`Successfully send message ${result.ts} in conversation ${slID}`);
                  
                })();
                
                sent = true;
                return false;
            }
            
        });

        if (!sent){


            (async () => {

                var slID = getSlackChannelID(channel.replace('#', '').toLowerCase());
                const result = await web.chat.postMessage({
                  text: channel + "--> " + tags.username + ": " + message,
                  channel: slID,
                  
                });
              
                // The result contains an identifier for the message, `ts`.
                console.log(`Successfully send message ${result.ts} in conversation ${slID}`);
                
              })();
        }


    }






  if((    message.toLowerCase().includes("madmonq") || 
    message.toLowerCase().includes("madmong") || 
    message.toLowerCase().includes("madmon") || 
    message.toLowerCase().includes("monq") || 
    message.toLowerCase().includes("mekong")) && 
    (!botIgnore.includes(tags.username.toLowerCase()))
  )
  

 // if (message.toLowerCase().includes("!dabing"))
  {
    
    //client.say(channel, 'hueuhe');
    var sent = false;
    messageLog.every(function(msgL){

        
      if (msgL.text.toLowerCase().includes(message.toLowerCase())){
        
        (async () => {

          var slID = getSlackChannelID(channel.replace('#', '').toLowerCase());
          const result = await web.reactions.add({
            name: 'forsene',
            channel: slID,
            timestamp: msgL.id
          }).catch(err => {
            console.log(err);
          });
        
          // The result contains an identifier for the message, `ts`.
          //console.log(`Successfully send message ${result.ts} in conversation ${slID}`);
          
        })();
        (async () => {

          var slID = getSlackChannelID(channel.replace('#', '').toLowerCase());
          const result = await web.chat.postMessage({
            text: tags.username + ": " + message,
            channel: slID,
            thread_ts: msgL.id
          });
        
          // The result contains an identifier for the message, `ts`.
          console.log(`Successfully send message ${result.ts} in conversation ${slID}`);
          
        })();
        
        sent = true;
        return false;
      }
    });
    if (!sent){
      (async () => {

        var msg_output = new slackMessage(tags.username + ": " + message, '');  
        //var msg_output = tags.username + ": " + message;
        console.log(channel + "--> " + msg_output.text);
      // Post a message to the channel, and await the result.
      var slID = getSlackChannelID(channel.replace('#', '').toLowerCase());
      // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
      const result = await web.chat.postMessage({
        text: channel + "--> " + msg_output.text,
        channel: slID
      });
    
      // The result contains an identifier for the message, `ts`.
      console.log(`Successfully send message ${result.ts} in conversation ${slID}`);
      msg_output.id = result.ts;

     
      
      if (messageLog.length > 200){
          messageLog.pop();
      }
      messageLog.unshift(msg_output);
    })();
    
    }
    
    
 
  }

});

console.log("konec, jedem async");




function getSlackChannelID(channel){

  if (channel === "forsen"){
    return 'C025X48MUAW';
  }
  else if(streamersCZ.includes(channel)){
    return 'C021720QLE8'  // CZ channel slack
  }
  else if(streamersEN.includes(channel)){
    return 'C024KAVJFL4'  // EN channel slack
  }
  else if(streamersDE.includes(channel)){
    return 'C024A3TBNNR'  // DE channel slack
  }
  else if(streamersFR.includes(channel)){
    return 'C025309PJ2U'  // FR channel slack
  }
  
}






//console.log(liveChannels);
    


 

 




