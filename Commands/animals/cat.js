const Discord = require('discord.js');
const http = require('http');
module.exports = function cat(client, mess, args, systemColor) {
    const embedMessage = new Discord.MessageEmbed();
    http.get("http://aws.random.cat/meow" ,(res) =>{
        let bodyParser = "";
        res.on("data",(dataCount) =>{
            bodyParser += dataCount;
        });
        res.on("end",() =>{
            bodyParser = JSON.parse(bodyParser);
            embedMessage.setImage(bodyParser.file)
            .setColor(systemColor);
            mess.channel.send(embedMessage);
        })
    })
}