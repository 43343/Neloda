const Discord = require('discord.js');
module.exports.mute =  async (client, mess, args) => {
	let role = mess.guild.roles.cache.find(role => role.name === 'mute');
	const user = mess.guild.member(mess.mentions.users.first() || mess.guild.members.get(args[1]));
	const timeMute = function(args){
		var timeMuteUnite;
		var argsSegment = args.slice(0,args.length-1);
		var unite = args[args.length-1];
		if(unite == 'с') {timeMuteUnite = parseInt(argsSegment)*1000; console.log('e');}
		else if(unite == 'м') timeMuteUnite = parseInt(argsSegment)*60*1000;
		else if(unite == 'ч') timeMuteUnite = parseInt(argsSegment)*60*60*1000;
		else if(unite == 'д') timeMuteUnite = parseInt(argsSegment)*60*60*24*1000;
		else  timeMuteUnite = 0;
		return timeMuteUnite;
	}
	if(!role){
		    role = await mess.guild.roles.create({
            data: {
                name: 'mute',
                color: 'RED',
	            position: mess.guild.roles.cache.find(role => role.name === 'DISCORD BOT').position +1,
            },
             reason: 'we needed a role for Super Cool People',
            });
			role.setPermissions(0);
			 mess.guild.channels.cache.forEach(async (channel) => {
				channel.overwritePermissions([
				{
					id: role.id,
					deny: ["SEND_MESSAGES","ADD_REACTIONS","SPEAK","STREAM","MANAGE_WEBHOOKS","USE_VAD","MOVE_MEMBERS","DEAFEN_MEMBERS","MUTE_MEMBERS",
				   "CONNECT","MANAGE_MESSAGES","SEND_TTS_MESSAGES","PRIORITY_SPEAKER"]
				}
                ]);
			});
			mess.guild.channels.cache.forEach(async (channel) => {
	    channel.overwritePermissions([
		{
			id: role.id,
			deny: ["SEND_MESSAGES","ADD_REACTIONS","SPEAK","STREAM"]
		}
        ]);
	});
    }
	user.voice.setMute(true);
	user.voice.setDeaf(true);
	user.roles.add(role.id);
	if(x != 0)
	setTimeout(() => {
		user.voice.setMute(false);
	    user.voice.setDeaf(false);
		user.roles.remove(role.id);
	},timeMute(args[2]));
}
function unmute(client, mess, args) {
	const user = mess.guild.member(mess.mentions.users.first() || mess.guild.members.get(args[1]));
    let role = mess.guild.roles.cache.find(role => role.name === 'mute');
	user.voice.setMute(false);
	user.voice.setDeaf(false);
	user.roles.remove(role.id);
}
module.exports.unmute = unmute;