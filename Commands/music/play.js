const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require("ytsr");
module.exports = async function execute(client, mess, args,systemColor) {
    args.shift();
    const query = args.join(" ");
    const embed = new Discord.MessageEmbed();
    embed.setColor(systemColor);
    const voiceChannel = mess.member.voice.channel;
    if (!voiceChannel) {
        embed.setDescription("Я не вижу вас в голосовом канале:face_with_monocle:")
        return mess.channel.send(embed)
    };
    if(!query){
        embed.setDescription("Пожалуйста, введите название композиции");
         return mess.channel.send(embed);
    }
    mess.channel.send(":mag_right:Поиск...")
    const res = await ytsr(query).catch(e => {
        embed.setDescription("Ксожелению , по вашему запросу я ничего не нашел");
        return mess.channel.send(embed);
    });
    const video = res.items.filter(i => i.type === "video")[0];
    if(!video){
        embed.setDescription("Ксожелению , по вашему запросу я ничего не нашел");
        return mess.channel.send(embed);
    }
    
    serverQueue = queue.get(mess.guild.id);
    const serverQueueRepeat = queueRepeatMap.get(mess.guild.id);
    const permissions = voiceChannel.permissionsFor(mess.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return mess.channel.send('У меня нет разрешения заходить в этот голосовой канал!');
    }
    const song = {
    thumbnail:video.thumbnails[0].url,
    member: mess.member.id,
    duration: video.duration,
    title: video.title,
    url: video.url,
    };
    embed.addFields(
        {name:"Добавил в очередь", value:`<@${song.member}>`,inline:true},
        {name:"Продолжительность", value:song.duration,inline:true}
    )
    .setThumbnail(song.thumbnail)
    .setTitle(song.title)
    .setURL(song.url)
    .setAuthor("Добавлено в очередь", "https://yt3.ggpht.com/a/AATXAJy7lH0SMPsWLmhiANgNL1NHNRClVmXfE1CAnTzQ=s900-c-k-c0xffffffff-no-rj-mo")
    mess.channel.send(embed);
   
    if (!serverQueue) {
    const queueContruct = {
    textChannel: mess.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
    };
    const songsQueueRepeat = [];
   
    queue.set(mess.guild.id, queueContruct);
    queueRepeatMap.set(mess.guild.id, songsQueueRepeat);
    if(queueRepeat.get(mess.guild.id)) songsQueueRepeat.push(song);
   
    queueContruct.songs.push(song);
   
    try {
    var connection = await voiceChannel.join();
    queueContruct.connection = connection;
    play(mess.guild, queueContruct.songs[0],systemColor, voiceChannel);
    } catch (err) {
    console.log(err);
    queue.delete(mess.guild.id);
    return mess.channel.send(err);
    }
    } else {
    serverQueue.songs.push(song);
    console.log(serverQueueRepeat)
    if(queueRepeat.get(mess.guild.id)) serverQueueRepeat.push(song);
    }
    function play(guild, song, systemColor, voiceChannel) {
        serverQueue = queue.get(guild.id);
        const serverQueueRepeat = queueRepeatMap.get(guild.id);
       if(voiceChannel.members.size > 1){
           console.log(voiceChannel.members.size);
        if (!song) {
            if(queueRepeat.get(guild.id)){
                serverQueue.songs = serverQueue.songs.concat(serverQueueRepeat);
                return play(guild, serverQueue.songs[0],systemColor, voiceChannel);
            }
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        repeat.delete(guild.id)
        queueRepeat.delete(guild.id);
        queueRepeatMap.delete(guild.id);
        return;
        }
       
        const dispatcher = serverQueue.connection.play(ytdl(song.url));
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
        mess.channel.send(embed);
        dispatcher.on('finish', () => {
        console.log('Music ended!');
        if(!repeat.get(mess.guild.id)) serverQueue.songs.shift();
        play(guild, serverQueue.songs[0],systemColor, voiceChannel);
        })
        dispatcher.on('error', error => {
        console.error(error);
        });
       }
    else{
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        repeat.delete(guild.id)
        queueRepeat.delete(guild.id);
        queueRepeatMap.delete(guild.id);
    }
}
   
}