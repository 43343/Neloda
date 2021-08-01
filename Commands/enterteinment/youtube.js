const Discord = require('discord.js');
const fetch = require("node-fetch")
module.exports = function youtube(client, mess, args, systemColor) {
	let channel = mess.member.voice.channel;
    if(!channel) return mess.channel.send("Зайдите в голосовой канал");

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`,{
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${process.env.DISCORD_BOT_TOKEN}`,
            "Content-Type": "application/json"
        }
    })
    .then(res =>  res.json())
    .then(invite => {
        if(!invite.code) mess.channel.send(invite);
        const embed = new Discord.MessageEmbed()
        .setDescription(`Для просмотра Youtube  в голосовом канале нажмите [сюда](https://discord.com/invite/${invite.code})`)
        .setFooter("Работает только на персональных компьютерах","http://www.thegoldqueen.com/wp-content/uploads/2018/07/warning-sign-040615.jpg")
        .setColor(systemColor);
        mess.channel.send(embed)
    })
}
