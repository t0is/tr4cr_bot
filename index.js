require('dotenv').config();
const request = require("request");
const async = require("async");
var accessToken = '';

var channels = ['ratirl','Agraelus', 'CzechCloud', 'PimpCSGO', 'ArcadeBulls', 'Freezecz', 'Astatoro', 'dafran',
'Xnapycz', 'LexVeldhuis', 'Claina', 'Kokiii_', 'Patrikturi', 'STYKO', 'forsen', 'FlyGunCZ', 'Batmanova',
'liveoliverr', 'Artix', 'resttpowered', 'Herdyn', 'spajKK', 'bladeito', 'marty_vole', 'KuruHS',
'Mrtweeday', 'TenSterakdary', 'nikdohonehleda'];

var liveChannels = ['Agraelus'];

const options = {
  url: 'https://id.twitch.tv/oauth2/token',
  json:true,
  body: {
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
  grant_type: 'client_credentials'
  }
};


function liveRequest(accessToken){

  channels.forEach(stream => {
        
   
    setTimeout(() => {
      const streamOptions = {
          url: 'https://api.twitch.tv/helix/streams?user_login=' + stream.toLowerCase(),
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
            console.log(JSON.parse(body).data[0].user_name + " " +JSON.parse(body).data[0].type);
            if (!liveChannels.includes(JSON.parse(body).data[0].user_name)){
              liveChannels.push(JSON.parse(body).data[0].user_name);
              //slack notif 
            }
          
            //console.log('parsnul jsem body'); 
            //return JSON.parse(body).data[0].type === 'live';
          }
          catch (e) {
            liveChannels = liveChannels.filter(item => item !== stream)
            //return null;
          }
        });
      
      };
    },2000);
    

  });
}
    


 

  request.post(options, (err,res,body)=>{
      if(err){
          return console.log(err);
      }
      
      liveRequest(body.access_token)
      //console.log('Status: ${res.statusCode}');
      //console.log(body.access_token);
      
      //console.log('hue');
  });


