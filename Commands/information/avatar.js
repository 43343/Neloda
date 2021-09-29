const Discord = require('discord.js');
module.exports = function avatarT(client, mess, args,systemColor) {
  const user = mess.mentions.users.first() || args[3] || mess.author;
  const exampleEmbed = new Discord.MessageEmbed()
  .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 }))
  .setDescription('аватар <@' + user+'>')
  .setColor(systemColor);
  mess.channel.send({embeds:[exampleEmbed]});
  console.log(user.displayAvatarURL())
}
