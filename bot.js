const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const https = require("https");
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({activity:{name:"Neloda Dashboard", type:"WATCHING"}});
});
setInterval(() => {
  https.get("https://api.steampowered.com/ISteamApps/GetAppList/v2/", (res) =>{
    let bodyParser = "";
    res.on("data", (dataParser) =>{
      bodyParser+=dataParser;
    });
    res.on("end", () =>{
      fs.writeFileSync('./Commands/steam/steamdatabase.txt', bodyParser);
    })
  })
}, 86400000);
require("./events/events")(client);
client.login(process.env.DISCORD_BOT_TOKEN);
