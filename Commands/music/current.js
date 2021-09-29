const Discord = require('discord.js');
module.exports = function current(client, mess, args, systemColor) {
    console.log(queue.get(mess.guild.id))
    if(queue.get(mess.guild.id)){
    const song = queue.get(mess.guild.id).songs[0];
    const embed = new Discord.MessageEmbed()
        .addFields(
            {name:"Добавил в очередь", value:`<@${song.member}>`,inline:true},
            {name:"Продолжительность", value:song.duration,inline:true}
        )
        .setThumbnail(song.thumbnail)
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor("Сейчас играет", "https://yt3.ggpht.com/a/AATXAJy7lH0SMPsWLmhiANgNL1NHNRClVmXfE1CAnTzQ=s900-c-k-c0xffffffff-no-rj-mo")
        .setColor(systemColor);
        mess.channel.send({embeds:[embed]});
    }
    else{
        const embed = new Discord.MessageEmbed()
        .setDescription("В данный момент ничего не воспроизводится")
        .setColor(systemColor);
        mess.channel.send({embeds:[embed]});
    }
}