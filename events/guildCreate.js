const GuildConfig = require("../database/schemas/GuildConfig");
module.exports = function(client)  {
    client.on('guildCreate', async(guild) => { // Реагирование на сообщения
    const guildConfig = await GuildConfig.create({
        guildId:guild.id,
    })
  });
}