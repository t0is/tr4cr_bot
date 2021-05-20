require('dotenv').config();
const fetch = require("node-fetch");
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
//const herokuApp = process.env.HEROKU_APP || null;
const youtubeFetchTimeout = 60000;
const slack_online_update = 'C0225846R9B';

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video';
//const discordApiKey = process.env.DISCORD_API_KEY;
//const discordApiUrl = `https://discordapp.com/api/webhooks/${discordApiKey}`;

const youtubeChannels = [
    {
        channelId: 'UCIAbC7emlDQs-dmgW4GlgnA',
        channelUrl: 'https://www.youtube.com/channel/UCIAbC7emlDQs-dmgW4GlgnA'
    }
];

let activeLiveStreams = new Set();

async function fetchLiveStreamStatus() {
    try {
        // for(const youtubeChannel of youtubeChannels) {
            const youtubeChannel = youtubeChannels[0];
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
    
                        (async () => {
                          var msg_output = "DuklockPlus is now live on YouTube.";
                          // Post a message to the channel, and await the result.
                          // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
                          const result = await web.chat.postMessage({
                            text: msg_output,
                            channel: slack_online_update
                          });
                          console.log(`Successfully send message in conversation ${slack_online_update}`);
                        })();
                    } else {
                        console.log(`Already alerted for this livestream ${element.id.videoId}. Skipping.`);
                    }
                });
            }
            else {
              console.log ('not active now');
            }
        // }
    } catch (error) {
        console.error(error);
    }
}

async function postToDiscord(json) {
    const resp = fetch(discordApiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(json)
    }).catch(error => console.log('Discord POST failed.', JSON.stringify(json), error));

    const content = await resp.json();
    console.log('Discord response', content); 
}
/*
async function herokuKeepAlive() {
    try {
        const response = await fetch(herokuApp);
        console.log('Heroku Keep-Alive Success')
    } catch(error) {
        console.error(error);
    }
}
*/
app.get('/', (req, res) => res.send('Shhh! Im busy monitoring Youtube Channels.'));
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
    setInterval(fetchLiveStreamStatus, youtubeFetchTimeout);
})