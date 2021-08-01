const Discord = require('discord.js');
module.exports = function stop(client, mess, args) {
    if(queue.get(mess.guild.id)){
 serverQueue.voiceChannel.leave();
 queue.delete(mess.guild.id);
    }
}