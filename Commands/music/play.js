const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require("ytsr");
const { StreamType,joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
module.exports = async function execute(client, mess, args,systemColor) {
    args.shift();
    const query = args.join(" ");
    const embed = new Discord.MessageEmbed();
    embed.setColor(systemColor);
    const voiceChannel = mess.member.voice.channel;
    console.log(voiceChannel.guild.id)
    if (!voiceChannel) {
        embed.setDescription("Я не вижу вас в голосовом канале:face_with_monocle:")
        return mess.channel.send({embeds:[embed]});
    };
    if(!query){
        embed.setDescription("Пожалуйста, введите название композиции");
         return mess.channel.send({embeds:[embed]});
    }
    mess.channel.send(":mag_right:Поиск...")
    const res = await ytsr(query).catch(e => {
        embed.setDescription("Ксожелению , по вашему запросу я ничего не нашел");
        return mess.channel.send({embeds:[embed]});
    });
    const video = res.items.filter(i => i.type === "video")[0];
    if(!video){
        embed.setDescription("Ксожелению , по вашему запросу я ничего не нашел");
        return mess.channel.send({embeds:[embed]});
    }
    
    serverQueue = queue.get(mess.guild.id);
    const serverQueueRepeat = queueRepeatMap.get(mess.guild.id);
    const permissions = voiceChannel.permissionsFor(mess.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return mess.channel.send({content:'У меня нет разрешения заходить в этот голосовой канал!'});
    }
    const song = {
    thumbnail:video.thumbnails[0].url,
    member: mess.member.id,
    duration: video.duration,
    title: video.title,
    url: video.url,
    };
    console.log(song)
    embed.addFields(
        {name:"Добавил в очередь", value:`<@${song.member}>`,inline:true},
        {name:"Продолжительность", value:song.duration,inline:true}
    )
    .setThumbnail(song.thumbnail)
    .setTitle(song.title)
    .setURL(song.url)
    .setAuthor("Добавлено в очередь", "https://yt3.ggpht.com/a/AATXAJy7lH0SMPsWLmhiANgNL1NHNRClVmXfE1CAnTzQ=s900-c-k-c0xffffffff-no-rj-mo")
    mess.channel.send({embeds:[embed]});
   
    if (!serverQueue) {
    const queueContruct = {
    textChannel: mess.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
    player:null,
    resource:null
    };
    const songsQueueRepeat = [];
   
    queue.set(mess.guild.id, queueContruct);
    queueRepeatMap.set(mess.guild.id, songsQueueRepeat);
    if(queueRepeat.get(mess.guild.id)) songsQueueRepeat.push(song);
   
    queueContruct.songs.push(song);
   
    try {
    var connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: mess.guild.id,
        adapterCreator: mess.guild.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    queueContruct.connection = connection;
    queueContruct.player = player;
    play(mess.guild, queueContruct.songs[0],systemColor, voiceChannel,player);
    } catch (err) {
    console.log(err);
    queue.delete(mess.guild.id);
    return mess.channel.send({content:err.toString()});
    }
    } else {
    serverQueue.songs.push(song);
    console.log(serverQueueRepeat)
    if(queueRepeat.get(mess.guild.id)) serverQueueRepeat.push(song);
    }
    function play(guild, song, systemColor, voiceChannel, player) {
        serverQueue = queue.get(guild.id);
        const serverQueueRepeat = queueRepeatMap.get(guild.id);
        console.log(voiceChannel.members.size)
       if(voiceChannel.members.size > 0){
           console.log(voiceChannel.members.size);
        if (!song) {
            if(queueRepeat.get(guild.id)){
                serverQueue.songs = serverQueue.songs.concat(serverQueueRepeat);
                return play(guild, serverQueue.songs[0],systemColor, voiceChannel);
            }
            serverQueue.connection.destroy();
        queue.delete(guild.id);
        repeat.delete(guild.id)
        queueRepeat.delete(guild.id);
        queueRepeatMap.delete(guild.id);
        return;
        }
        const stream = ytdl(song.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream , { inputType: StreamType.Arbitrary });
        player.play(resource);
        serverQueue.connection.subscribe(player);
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
        player.on(AudioPlayerStatus.Idle, () => {
            console.log("Music ended")
            if(!repeat.get(mess.guild.id)) serverQueue.songs.shift();
        play(guild, serverQueue.songs[0],systemColor, voiceChannel,player);
        });
        player.on('error', error => {
            mess.channel.send({content:`Ошибка воспроизведения ${song.title}. Трек будет пропущен`});
            if(!repeat.get(mess.guild.id)) serverQueue.songs.shift();
        play(guild, serverQueue.songs[0],systemColor, voiceChannel,player);
        });
       }
    else{
        serverQueue.connection.destroy();
        queue.delete(guild.id);
        repeat.delete(guild.id)
        queueRepeat.delete(guild.id);
        queueRepeatMap.delete(guild.id);
    }
}
   
}