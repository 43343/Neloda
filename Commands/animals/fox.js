const Discord = require('discord.js');
const http = require('http');
module.exports = function fox(client, mess, args,systemColor) {
    const embedMessage = new Discord.MessageEmbed();
    http.get("http://wohlsoft.ru/images/foxybot/randomfox.php" ,(res) =>{
        let bodyParser = "";
        res.on("data",(dataCount) =>{
            bodyParser += dataCount;
        });
        res.on("end",() =>{
            bodyParser = JSON.parse(bodyParser);
            embedMessage.setImage(bodyParser.file)
            .setColor(systemColors);
            mess.channel.send(embedMessage);
        })
    })
}