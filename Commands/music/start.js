const Discord = require('discord.js');
module.exports = function start(client, mess, args, systemColor) {
    if(queue.get(mess.guild.id)){
    serverQueue.connection.dispatcher.resume();
    const embed = new Discord.MessageEmbed()
    .setColor(systemColor)
    .setDescription("Проигрывание снято с паузы");
    mess.channel.send(embed);
    }
}