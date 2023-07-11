
require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const slack_token = process.env.SLACK_TOKEN;
const request = require("request");
const async = require("async");
var accessToken = '';
const tmi = require('tmi.js');
const fs = require('fs');

// https setup
var http = require('http');
var https = require('https');

var credentials = {
  key: fs.readFileSync('/etc/letsencrypt/live/madmonqslackapp.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/madmonqslackapp.online/fullchain.pem')
}

// var credentials = {
//   key: fs.readFileSync('ssl/key.pem'),
//   cert: fs.readFileSync('ssl/cert.pem')
// }


var liveChannels = [];





// Read and parse the JSON file
let rawdata = fs.readFileSync('streamers.json');
let streamers = JSON.parse(rawdata);

// Convert the streamers to lowercase
for (let prop in streamers) {
  if (streamers.hasOwnProperty(prop) && Array.isArray(streamers[prop])) {
      streamers[prop] = streamers[prop].map(v => v.toLowerCase());
  }
}

let channelsList = [];

for (let prop in streamers) {
    if (streamers.hasOwnProperty(prop) && Array.isArray(streamers[prop])) {
      channelsList = channelsList.concat(streamers[prop]);
    }
}

var botIgnore = ['oliveruvotrok', 'nightbot', 'streamelements', 'botalfr3d', 'madmonkeyv2', 'moobot'];


var messageLog = [];


class slackMessage {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }
}

class liveChannelClass {
  constructor(channel, ts) {
    this.channel = channel;
    this.ts = ts;

  }
}

const options = {
  url: 'https://id.twitch.tv/oauth2/token',
  json: true,
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
    username: 'MADMONQ_bot',
    password: process.env.TWITCH_OAUTH_TOKEN
  },
  channels: channelsList

  //channels: ['MADMONQ', 'tom__mm']
});

const fetch = require("node-fetch");
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 443;
//const herokuApp = process.env.HEROKU_APP || null;

const web = new WebClient(slack_token);
const slack_channel_ID = 'C021720QLE8';
const slack_online_update = 'C0225846R9B';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }))

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080);



///////TEST TEST TEST///////

// const slack_channel_ID = 'C02JHLEBB0D';
// const slack_online_update = 'C02JHLEBB0D';


function liveRequest(accessToken) {

  channelsList.forEach(streamName => {
    streamName = streamName.replace('#', '');


    const streamOptions = {
      url: 'https://api.twitch.tv/helix/streams?user_login=' + streamName.toLowerCase(),
      method: 'GET',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': 'Bearer ' + accessToken
      }
    }
    if (!accessToken) {
      console.log("No Token");
    } else {
      //console.log(streamOptions);

      const liveRequest = request.get(streamOptions, (err, res, body) => {
        if (err) {
          return console.log(err);
        }

        //console.log('Status: ${res.statusCode}');

        try {
          //console.log(res);
          //console.log(JSON.parse(body).data[0].user_name + " " +JSON.parse(body).data[0].type);
          var isLiveAlready = liveChannels.find(function (ch, index) {
            if (ch.channel == JSON.parse(body).data[0].user_name.toLowerCase()) {
              return true;
            }
          });

          if (typeof isLiveAlready == 'undefined' && JSON.parse(body).data[0].user_name) {
            channelToAlertLive = new liveChannelClass(JSON.parse(body).data[0].user_name.toLowerCase(), 0);
            liveChannels.push(channelToAlertLive);
            (async () => {
              var chSaved = channelToAlertLive.channel;
              var msg_output = channelToAlertLive.channel + " is now live on Twitch.";
              console.log(msg_output);
              // Post a message to the channel, and await the result.
              // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
              const result = await web.chat.postMessage({
                text: msg_output,
                channel: slack_online_update
              });

              // The result contains an identifier for the message, `ts`.
              console.log(`Successfully send message ${result.ts} in conversation ${slack_online_update}`);
              //channelToAlertLive.ts = result.ts;
              liveChannels.find(function (ch, index) {
                if (ch.channel == chSaved) {
                  ch.ts = result.ts;
                }
              })


            })();


            //console.log('pagman')
            //slack notif
          }
          else {
            console.log("Already live: " + streamName);

          }

          //console.log('parsnul jsem body');
          //return JSON.parse(body).data[0].type === 'live';
        }
        catch (e) {
          var msgTS = liveChannels.find(function (ch, index) {
            if (ch.channel == streamName) {
              return ch.ts;
            }
          });

          liveChannels = liveChannels.filter(item => item.channel !== streamName.toLowerCase());

          if (typeof msgTS !== 'undefined') {
            (async () => {

              var slID = slack_online_update;
              const result = await web.reactions.add({
                name: 'peeposad',
                channel: slID,
                timestamp: msgTS.ts
              }).catch(err => {
                console.log(err);
              });

              // The result contains an identifier for the message, `ts`.
              //console.log(`Successfully send message ${result.ts} in conversation ${slID}`);

            })();
          }
          //console.log("ZMENAZMENAZMENAZMENAZMENA: " + liveChannels);
          //return null;
        }
      });

    };



  });
}

/////////////////////////////////////////////














httpsServer.listen(port, () => {
  console.log(`App listening on port ${port}!`);
  // check jestli je live
  setInterval(() => {
    request.post(options, (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      liveRequest(body.access_token);
      //connectToAllLiveChannels();
      //console.log(res);

    });
  }, 10000);
})

app.post('/', (req, res) => {
  let data = req.body;
  res.send('Data Received: ' + JSON.stringify(data));
})

app.post('/test', (req, res) => {
  let data = req.body;
  res.send('Got test message, sending response. Hello World.');
})

app.post('/addstreamer', (req, res) => {
  const params = req.body.text.split(' ');
  let newChannelName = params[0];
  let channel_lang = params[1];

  client.join(newChannelName).then((data) => {
    console.log(`Joined ${newChannelName}`);

    // Add the new channel to the streamers object
    let add_res = addNewChannel(newChannelName, channel_lang)
    
    if (add_res) {
      res.send(`Joined ${newChannelName} and added it to the list.`);
    }
    else {
      res.send(`${newChannelName} already present. Skipped.`);
    }
    

  }).catch((err) => {
    res.send(`Error: ${err.message}`);
  });
})

app.post('/rmstreamer', (req, res) => {
  const params = req.body.text.split(' ');
  let channelNameToLeave = params[0];
  console.log(`parting ${channelNameToLeave}`);
  // Leave the channel
  client.part(channelNameToLeave).then((data) => {

    // Remove the channel from the streamers object

    for(let key in streamers){
      streamers[key] = streamers[key].filter(channel => channel !== channelNameToLeave);
    }

    // Overwrite the JSON file with the updated list
    fs.writeFileSync('streamers.json', JSON.stringify(streamers));

    res.send(`Left ${channelNameToLeave}`);

  }).catch((err) => {
    res.send(`Error: ${err.message}`);
  });
})



app.post('/streamers', (req, res) => {
  const params = req.body.text.split(' ');
  let channel_param = params[0];

    let resp_str = "";
    for (let key in streamers) {
      if (streamers.hasOwnProperty(key)) {
        if(channel_param.trim() != "" && !key.toLowerCase().includes(channel_param.toLowerCase())) {
          continue;
        }
        resp_str += `\n\nStreamers from ${key}:\n`;
        resp_str += JSON.stringify(streamers[key], null, 2);
      }
    }
    res.send(resp_str);
})



client.connect();


client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
  //if(self || !message.startsWith('!')) {
  if (self) {
    return;
  }


  if (tags.username.toLowerCase() === "madmonq") {

    var sent = false;
    var uname = message.split(' ')[0].replace('@', '');

    messageLog.every(function (msgL) {

      if (msgL.text.toLowerCase().includes(uname.toLowerCase())) {


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

    if (!sent) {


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

  if (tags.username.toLowerCase() === "madmonq_padawan") {

    var uname = message.split(' ')[0].replace('@', '');

    (async () => {

      var slID = "C02JHLEBB0D";
      const result = await web.chat.postMessage({
        text: channel + "--> " + tags.username + ": " + message,
        channel: slID,

      });

      // The result contains an identifier for the message, `ts`.
      console.log(`Successfully send message ${result.ts} in conversation ${slID}`);

    })();
  }

  if (tags.username.toLowerCase() === "cherrinka") {

    var uname = message.split(' ')[0].replace('@', '');

    (async () => {

      var slID = "C03DQ7MC3HR";
      const result = await web.chat.postMessage({
        text: channel + "--> " + tags.username + ": " + message,
        channel: slID,

      });

      // The result contains an identifier for the message, `ts`.
      console.log(`Successfully send message ${result.ts} in conversation ${slID}`);

    })();
  }









  if ((message.toLowerCase().includes("madmonq") ||
    message.toLowerCase().includes("madmong") ||
    message.toLowerCase().includes("madmon") ||
    message.toLowerCase().includes("monq") ||
    message.toLowerCase().includes("mekong")) &&
    ((!message.toLowerCase().includes("madmonkeyv2")) && (!botIgnore.includes(tags.username.toLowerCase())))
  )


  // if (message.toLowerCase().includes("!dabing"))
  {

    //client.say(channel, 'hueuhe');
    var sent = false;
    messageLog.every(function (msgL) {


      if (msgL.text.toLowerCase().includes(message.toLowerCase())) {

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
    if (!sent) {
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



        if (messageLog.length > 200) {
          messageLog.pop();
        }
        messageLog.unshift(msg_output);
      })();

    }

  }

});




function getSlackChannelID(channel) {
  // return "C02JHLEBB0D";
  if (channel === "forsen") {
    return 'C025X48MUAW';
  }
  else if (streamers.streamersCZ.includes(channel)) {
    return 'C021720QLE8';  // CZ channel slack
  }
  else if (streamers.streamersEN.includes(channel)) {
    return 'C024KAVJFL4';  // EN channel slack
  }
  else if (streamers.streamersDE.includes(channel)) {
    return 'C024A3TBNNR';  // DE channel slack
  }
  else if (streamers.streamersFR.includes(channel)) {
    return 'C025309PJ2U';  // FR channel slack
  }

}




function addNewChannel(channel_name, channel_lang) {
  for (let key in streamers) {
    if (streamers.hasOwnProperty(key)) {
      if(key.toLowerCase().includes(channel_lang.toLowerCase())) {
        if(!streamers[key].includes(channel_name.toLowerCase())) {
          streamers[key].push(channel_name.toLowerCase());
          fs.writeFileSync('streamers.json', JSON.stringify(streamers));
          return true;
        }
        else {
          return false;
        }
        
      }
    }
  }
}