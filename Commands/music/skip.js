const Discord = require('discord.js');
module.exports = function skip(client, mess, args) {
    if(mess.member.voice.channel !== serverQueue.voiceChannel) return;
    if(queue.get(mess.guild.id)){
        serverQueue.connection.dispatcher.end()
    }
}