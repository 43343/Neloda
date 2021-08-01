
module.exports = async function events(client) {
    console.log("dddd");
require("./message")(client);
require("./guildCreate")(client);
require("./voiceStateUpdate")(client);
}