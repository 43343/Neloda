const Discord = require('discord.js');
module.exports = function start(client, mess, args, systemColor) {
    if(queue.get(mess.guild.id)){
        serverQueue.player.unpause();
    const embed = new Discord.MessageEmbed()
    .setColor(systemColor)
    .setDescription("Проигрывание снято с паузы");
    mess.channel.send({embeds:[embed]});
    }
}