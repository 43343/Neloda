const Discord = require('discord.js');
module.export = function kick(client, mess, args) {
        const user = mess.mentions.members.first() || args[3];
if (user) {
        mess.mentions.members.first().kick();
}
}
