const fetch = require("node-fetch");
const TOKEN = "Nzk0MjcyNDc1NzgwMzUwMDIz.X-4Z4w.swfDuhv1w54Id-yrwvfcytjffgM";
async function getBotGuilds() {
    const response = await fetch("http://discord.com/api/v6/users/@me/guilds",{
        method:'GET',
        headers:{
            Authorization:`Bot ${TOKEN}`
        }
    });
    return response.json();
}
module.exports = {getBotGuilds}