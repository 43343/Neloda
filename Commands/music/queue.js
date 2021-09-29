const Discord = require('discord.js');
module.exports = function queues(client, mess, args, systemColor) {
    if(queue.get(mess.guild.id)){
        console.log(queue.get(mess.guild.id).songs.length);
        let length = queue.get(mess.guild.id).songs.length;
        if(length < 2){
            const embed = new Discord.MessageEmbed()
        .setDescription("В данный момент в очереди ничего нет")
        .setColor(systemColor);
        mess.channel.send({embeds:[embed]});
        }
        else{
            if(length > 10) length = 10;
            let description = '';
            for(let i = 1;i<length;i++){
                description += `${i}) [${queue.get(mess.guild.id).songs[i].title}](${queue.get(mess.guild.id).songs[i].url}) \n`
            }
            const embed = new Discord.MessageEmbed()
            .setAuthor("Очередь", "https://yt3.ggpht.com/a/AATXAJy7lH0SMPsWLmhiANgNL1NHNRClVmXfE1CAnTzQ=s900-c-k-c0xffffffff-no-rj-mo")
            .setColor(systemColor)
            .setThumbnail(queue.get(mess.guild.id).songs[1].thumbnail)
            .setDescription(description);
            mess.channel.send({embeds:[embed]})
        }
    }
    else{
        const embed = new Discord.MessageEmbed()
        .setDescription("В данный момент ничего не воспроизводится")
        .setColor(systemColor);
        mess.channel.send({embeds:[embed]});
    }
}