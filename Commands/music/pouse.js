const Discord = require('discord.js');
module.exports = function pouse(client, mess, args, systemColor) {
    if(mess.member.voice.channel !== serverQueue.voiceChannel) return;
    if(queue.get(mess.guild.id)){
    serverQueue.connection.dispatcher.pause();
    const embed = new Discord.MessageEmbed()
    .setColor(systemColor)
    .setDescription("Пауза активна");
    mess.channel.send(embed);
    }
}