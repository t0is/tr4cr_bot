
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

    if(message.toLowerCase().startsWith("!pipík")){

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

    if(message.toLowerCase().startsWith("!číča")){

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

    if(message.toLowerCase().startsWith("!kuchar")){

      var input = message.split(' ');
      var name;
      if (input.length < 2)
        name = tags.username;
      else
        name = input[1];

      const responses = [ 'umí vařit jen kýbl hoven.', 'zvládne čaj i instantní nudle.', 'umí těstoviny s kečupem a sýrem.',
      'vaří hotovky jak po másle a minutky taky zvládne.', 'kulinářský zážitek že ti i tarantule v banánovim listu bude připadat jak modrý z nebe.',
      'umí perník lépe než Mr. White Pog'];

      client.say(channel, "/me " + name + " " +  responses[Math.floor(Math.random() * responses.length)]);

      //client.say(channel, "/me " + 'hueuhe');
    }

    if(message.toLowerCase().startsWith("!kompliment")){

      var input = message.split(' ');
      var name;
      if (input.length < 2)
        name = tags.username;
      else
        name = input[1];


      const responses = ["Ty jsi skoro tak hezká jako moje sestra.",
      "Moje láska k tobě je jako průjem, nedokážu ji v sobě udržet.",
      "Na tlustou holku máš docela malý kozy.",
      "Máš ráda průvan? Já jen, že bych ti ho tam fouknul.",
      "Tohle se samo nevykouří.",
      "Sralas?",
      "Tvé kozy vypadají těžce, nemám ti je podržet?",
      "Nezlobte se – ale neprdla jste si? Úplně jste mě totiž smetla…",
      "Nechceš jít ke mně a kouknout se na nějaké porno na mém 52palcovém zrcadle?",
      "Pokud bys byla můj domácí úkol, tak bych tě udělal na pracovním stole.",
      "Slečno, vy máte v kapse zdrcátko? Já jen že už se vidím ve vašich kalhotkách.",
      "Je to jen mnou nebo si tě všichni chlapi představují nahou?",
      "Nechme mezi naší láskou stát pouze latex.",
      "Nepracuješ ve starožitnictví? Protože mám v kalhotách něco, čeho se už pár let nikdo nedotkl.",
      "Sakra holka, s tímhle zadkem sereš?",
      "Ty jsi tak krásná, že ti to chci udělat zezadu.",
      "Na to jak jsi tlustá tak se moc nepotíš.",
      "Tvůj táta musí být terorista, protože ty jseš fakt bomba!",
      "Mám rád ženy stejně, jako mám rád kafe. Plné smetany.",
      "Ty jsi víc sexy než moje dcera!",
      "Ahoj, jmenuji se Lukáš. Pamatuj si to, budeš to dnes večer křičet!",
      "Dobrý bože! Ty jsou pravé?!",
      "Můžu zatlačit tvojí stolici zpátky dovnitř?",
      "Doufám, že věříš v karmu. Protože já vím hodně o karma-sutře.",
      "Jsi zevnitř tak krásná, jak jsi zvenčí?",
      "Máte zrcadlo v kalhotkách? Protože se v nich vidím.",
      "Je tvoje máma drogovej dealer? Protože seš fakt dobrej matroš!",
      "Roztáhni nohy, mačkáš mi večeři.",
      "Ladí ti závěsy s kobercem?",
      "Neboj se, 80% z toho si užiješ.",
      "Když s tebou mluvím, je pro mě těžké se koncentrovat, protože všechnu krev mám ve své erekci.",
      "Nikoho nemám, má holka zemřela na infarkt po dlouhé sérii orgasmů.",
      "Rád bych si s vámi vyměňoval tělesné tekutiny.",
      "Můžu být párkem ve tvém rohlíku?",
      "Pracuju na nových pornostránkách. Chceš být v prvním videu?",
      "Víš jaký je rozdíl mezi cheeseburgerem a erekcí? Teď nemám cheeseburger.",
      "Víš, co bych dělal, kdybych byl tebou? Měl bych se mnou sex.",
      "Wow, kotě, nejsi náhodou komunistická revolucionářka? Cítím blížící se povstání své spodiny!",
      "Čus, šťávo. Kam tečeš?",
      "Věříš na lásku na první pohled nebo mám projít ještě jednou?",
      "Kdybych dostal dvacku pokaždé, co bych viděl někoho tak krásného jako ty, tak bych měl dvacku.",
      "Hej, kočko. Chtěla by se připojit na matematickou lekci? Sečteme mě a tebe, odečteme naše oblečení, rozdělíme naše nohy a vše znásobíme.",
      "Růže jsou rudé, fialky modré, neumím rýmovat, hezký prsa.",
      "Ahoj, já jsem Level 200 Warlock.",
      "Věděla jsi, že kůže je největší část těla? Tak v mém případě to neplatí.",
      "Nejsi náhodou kamera? Protože pokaždé, když se na tebe podívám, usmívám se!",
      "Kdybys byla úhloměr a já úhel, tak zjistíš, že já jsem ten pravý.",
      "Promiňte. Vím, že jsem trochu nesmělý, ale jen jsem přemýšlel. Jaké balící hlášky na vás fungují?",
      "Políbila byste úplně neznámého člověka? (Ne) Výborně. V tom případě dobrý den, já se jmenuju …….",
      "Promiň, ale už ti musím říct, co si lidi říkají za tvými zády………… Luxusní zadek!",
      "Slečno, máte ráda zvuk motorové pily? Ne? Tak to vás budu muset přeříznout klasickým způsobem",
      "Slečno, řekl bych vám příběh o mém penisu…ale je příliš dlouhý.",
      "Není tvůj táta pekař? Protože jsi dobrá buchta!",
      "Nemáš náhodou horečku? Já jen že vypadáš tak žhavě.",
      "Nejsi ty archeoložka? Protože jsi docela dobrá kost!",
      "Dej mi pusu, pokud se mýlím. Ale dinosauři stále existují, že?",
      "Jak se jmenuješ? Chci se ujistit, že dnes večer budu křičet správné jméno.",
      "Já nejsem opilý – to ty jsi mě omámila!",
      "Prej dělám strašně hezký děti.",
      "Patříš k těm lepším, co jsem kdy měl.",
      "Zrovna jsem si dal Viagru, takže máme asi 30 minut na to, abychom se dostali k tobě domů.",
      "Ahoj ty vypadáš jako slušná holka, která by se nevyspala s někým, koho nezná. Takže já jsem Tomáš",
      "Ahoj, dovolte mi, abych se vás na něco zeptal .. záleží opravdu na velikosti?",
      "Bojíš se bouřky? Protože já ho mám jako hrom.",
      "Bože, vy máte úžasné geny, to si vysloveně říká o reprodukci!",
      "Chceš jít se mnou na čerstvý vzduch? Právě jsi mi vyrazila dech.",
      "Ještě nechci děti, ale nevadilo by mi, kdybych si s tebou zdokonalil svou techniku ​​výroby dítěte.",
      "Jsi sobecká. To tělo budeš mít po zbytek života a já ho chci jen na jednu noc.",
      "Kdepak, já vám nekoukám na prsa! Já vám hledím na srdce…",
      "Musíš být opravdu unavená, protože jsi mi celou noc běžela v mysli.",
      "Venku svítí slunce ,co kdyby sis potěžkala mého sumce",
      "Ne že bych se na vás snažil dělat dojem nebo tak, ale… já jsem Batman!",
      "Nejsem meteorolog, ale řekl bych, že dnes v noci můžeme očekávat pár decimetrů.",
      "Nejste náhodou dekoratérka interiérů? Protože když jste vešla, celá místnost rázem zkrásněla…",
      "Nikdy bych s tebou nehrál na schovávanou, protože někoho jako jsi ty je opravdu těžké najít.",
      "Podívejte, mám tady také telepatické hodinky a ty mi říkají, že na sobě nemáte kalhotky. Ale ne! Ty potvory jdou o hodinu dopředu!",
      "Umíte telekinezi? Protože jste část mého těla přiměla pohnout, aniž byste se ho dotkla.",
      "Váš outfit by vypadal skvěle na podlaze mé ložnice.",
      "Vaše tělo se skládá ze 70% z vody. . .a já mám žízeň.",
      "Víte, v čem byste vypadala opravdu krásně? V mém obětí.",
      "Prosímtě, nesmrdí mi ruka po chloroformu?",
      "Na to jak jsi tlustá tak se moc nepotíš.",
      "Nespadla jsi z nebe? Vypadáš jako anděl.",
      "Já jsem Batman.",
      "Ty jsi víc sexy než moje dcera!",
      "Ztratil jsem klíče, nemůžu se ti podívat do kalhot?",
      "Kolik mě budeš stát na večer?",
      "Ženy, co mají knírek, jsou prý vášnivé.",
      "Nechceš vidět můj přetaktovanej procák?",
      "Zapomněl jsem své telefonní číslo, mohl bych dostat tvoje?",
      "Máš pěkné nohy, kdy mají otvírací dobu?",
      "Kdyby si byla úhloměr a já úhel, tak zjistíš, že já jsem ten pravý.",
      "Nejsi náhodou provaz? Já jen, že bych s tebou rád navázal kontakt.",
      "Nejsi náhodou bazén? Já jen, že bych se v tobě rád vyčvachtal.",
      "Nejsi náhodou sebevražda? Já jen, že na tebe myslím každý den.",
      "Jé, vy máte krásného pejska. Můžu si vás pohladit?",

      ];


      client.say(channel, "/me " + name + ": " +  responses[Math.floor(Math.random() * responses.length)]);

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

      client.say(channel, "/me " + name + " má " + Math.floor(iq) + " mozkových buněk.");
    }

    if(message.toLowerCase().startsWith("!chlast")){

      var input = message.split(' ');
      var name;
      if (input.length < 2)
        name = tags.username;
      else
        name = input[1];

      var iq=Math.round(Math.random(10)*5);

      client.say(channel, "/me " + name + " má " + Math.floor(iq) + " ‰");
    }




    if(message.toLowerCase().includes("just tipped czk 666")){

      var input = message.split(' ');
      var name = input[0];

      client.say(channel, "Shoutout pro Bloodwërk – songa z alertu https://open.spotify.com/track/5cLY4XfQEjAkcx7vvamhQn?si=0a30f61ccb894002");
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









