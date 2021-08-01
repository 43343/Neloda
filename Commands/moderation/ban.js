const Discord = require('discord.js');
function ban(client, mess, args) {
const user = mess.mentions.members.first() || args[3];
if (user) {
    mess.mentions.members.first().ban();
}
}
function unban(client, mess, args) {
const id = args[3];
if(id) mess.guild.members.unban(id);
}
module.exports.ban = ban;
module.exports.unban = unban;