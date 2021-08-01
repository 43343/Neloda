const Discord = require('discord.js');
module.exports = function repeats(client, mess, args, systemColor) {
    if(mess.member.voice.channel !== serverQueue.voiceChannel) return;
    if(!repeat.get(mess.guild.id) && !queueRepeat.get(mess.guild.id)){
        if(args[1] == "очередь"){
            queueRepeat.set(mess.guild.id,true);
            queueRepeatMap.set(mess.guild.id,queueRepeatMap.get(mess.guild.id).concat(queue.get(mess.guild.id).songs));
            const embed = new Discord.MessageEmbed()
    .setColor(systemColor)
    .setDescription("Включен повтор очереди");
    mess.channel.send(embed);
        }
        else {
            repeat.set(mess.guild.id,true);
            const embed = new Discord.MessageEmbed()
    .setColor(systemColor)
    .setDescription("Включен повтор текущей композиции");
    mess.channel.send(embed);
        }
    } 
    else{
        queueRepeat.delete(mess.guild.id) ;
        repeat.delete(mess.guild.id);
        queueRepeatMap.delete(mess.guild.id);
        const embed = new Discord.MessageEmbed()
    .setColor(systemColor)
    .setDescription("Выключен повтор");
    mess.channel.send(embed);
    }
}