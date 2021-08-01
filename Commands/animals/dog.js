const Discord = require('discord.js');
const https = require('https');
module.exports = function dog(client, mess, args,systemColor) {
    const embedMessage = new Discord.MessageEmbed();
    https.get("https://random.dog/woof.json" ,(res) =>{
        let bodyParser = "";
        res.on("data",(dataCount) =>{
            bodyParser += dataCount;
        });
        res.on("end",() =>{
            bodyParser = JSON.parse(bodyParser);
            embedMessage.setImage(bodyParser.url)
            .setColor(systemColor);
            mess.channel.send(embedMessage);
        })
    })
}