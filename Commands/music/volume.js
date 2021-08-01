const Discord = require('discord.js');
module.exports = function volume(client, mess, args) {
    if(mess.member.voice.channel !== serverQueue.voiceChannel) return;
    if(queue.get(mess.guild.id)){
    if(parseInt(args[1]) > 100) dispatcher.setVolume(1);
    else if(parseInt(args[1]) < 0) dispatcher.setVolume(0);
    else dispatcher.setVolume(parseInt(args[1])/100)
    }
}