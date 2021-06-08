
require('dotenv').config();

const { WebClient } = require('@slack/web-api');
const slack_token = process.env.SLACK_TOKEN;
const request = require("request");
const async = require("async");
var accessToken = '';
const tmi = require('tmi.js');

const commands = require('./commands.json');


var channelList = ['hryminejdoukerol', 'nikdohonehleda'];

class slackMessage {
    constructor(text, id){
        this.text = text;
        this.id = id;
    }
}

const options = {
  url: 'https://id.twitch.tv/oauth2/token',
  json: true,
  body: {
  client_id: process.env.TWITCH_BOT_KAREL_ID,
  client_secret: process.env.TWITCH_BOT_KAREL_SECRET,
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
    username: 'BanyMiJdouKarel',
    password: process.env.TWITCH_BOT_KAREL_TOKEN
  },
  channels: channelList
  
  //channels: ['MADMONQ', 'nikdohonehleda']
});



client.connect();


client.on('message', (channel, tags, message, self) => {
  // Ignore echoed messages.
    //if(self || !message.startsWith('!')) {
    if(self){
        return;
    }
    

    commands.commandList.forEach(c => {

      if(message.toLowerCase().includes(c.cmd)){
        client.say(channel, "/me " + c.text);
        //client.say(channel, "/me " + 'hueuhe');
    }
    });
    
    if(message.toLowerCase().startsWith("!delka")){

      var input = message.split(' ');
      var name;
      if (input.length < 2) 
        name = tags.username;
      else 
        name = input[1];

      const responses = [ 'je bejk, měří neuvěřitelných 30 cm.', 'se díky 8 cm neumístil ani v top 20.', 'se za svůj průměr 12 cm nemusí vůbec stydět. ', 
      'ohromil Jarmilu 20 cm v pozoru.', 'páni, ten je velkej!','to ani nestojí za řeč, stejně všichni ví, že Kyblh0ven je největší č.. PepeLaugh ']; 
      
      client.say(channel, "/me " + name + " " +  responses[Math.floor(Math.random() * responses.length)]);
    
      //client.say(channel, "/me " + 'hueuhe');
    }

    if(message.toLowerCase().startsWith("!hloubka")){

      var input = message.split(' ');
      var name;
      if (input.length < 2) 
        name = tags.username;
      else 
        name = input[1];

      const responses = ['hluboká jak Macocha.', 'strčí Mariánský příkop hravě do kapsy.', 'tam vrazí i kamion. ', 'tak sem se nevejde ani beruška.', '\"Jsi můj první.. Přísahám\" modCheck '];
      
      client.say(channel, "/me " + name + " " +  responses[Math.floor(Math.random() * responses.length)]);
    
      //client.say(channel, "/me " + 'hueuhe');
    }

    if(message.toLowerCase().startsWith("!prsa")){

      var input = message.split(' ');
      var name;
      if (input.length < 2) 
        name = tags.username;
      else 
        name = input[1];

      const  responses = ['s tímto jdi radši do Kaufu pro kuřecí.', 'má krásný, pevný trojky.', 'má povadlý pětky.', 'si namotá svoje osmičky jako šálu.', 'kde jsou? modCheck', 
      'obdarovala příroda lentilkama pod kobercem.', 'má po takovém množství piva kvalitní čtyřky.', 'myslí že má trojky, ale jsou to dvojky. Jde to blbě poznat, když dělá stojky.'];
      
      client.say(channel, "/me " + name + " " +  responses[Math.floor(Math.random() * responses.length)]);
    
      //client.say(channel, "/me " + 'hueuhe');
    }


    if(message.toLowerCase().startsWith("!miry")){

      var input = message.split(' ');
      var name;
      if (input.length < 2) 
        name = tags.username;
      else 
        name = input[1];

      const  r = [];
      

      var prsa=Math.round(Math.random(10)*(150-50)+50);
      var pas = Math.round(Math.random(10)*(150-50)+50);
      var boky = Math.round(Math.random(10)*(150-50)+50);
      
      if(prsa < pas && pas < boky) {
        r.push('Celkem pěkná hruška forsenScoots');
      }
      else if (prsa > pas && pas > boky){
        r.push('Trojúhelník, který by i Pythagoras záviděl forsenScoots');
      }
      else 
        r.push('Míry jako modelka Pog');
        r.push('Send nudes PogTasty');
        r.push('peepoShrug čekal jsem trochu víc..');


      client.say(channel, "/me " + name + " " + prsa+ "-"+ pas + "-" + boky + " " + r[Math.floor(Math.random() * r.length)]);
    }


    if(message.toLowerCase().startsWith("!mozek")){

      var input = message.split(' ');
      var name;
      if (input.length < 2) 
        name = tags.username;
      else 
        name = input[1];

      var iq=Math.round(Math.random(10)*(1000000));

      client.say(channel, "/me " + name + "má " + Math.floor(iq) + " mozkových buněk.");
    }








    if(countOccur(message.split(' '), "pepeJAM")){

      client.say(channel, "pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM pepeJAM");
    }

    if(countOccur(message.split(' '), "catJAM")){

      client.say(channel, "catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM");
    }

    if(countOccur(message.split(' '), "hryminHype")){

      client.say(channel, "hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype hryminHype");
    }
 
    
});





function countOccur(arr, keyword) {

  var count = 0;
  for(i=0; i<arr.length; i++){
    if(arr[i] === keyword){
      count++;
    }
  }

  return count >= 3;

}

function incrementSeconds() {
  seconds += 1;
  //console.log (seconds);
}



var emoteTrain = [];

var seconds = 0;
var timer = setInterval(incrementSeconds, 1000);




 




