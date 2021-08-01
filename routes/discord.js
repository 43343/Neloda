const router = require("express").Router();
const {getBotGuilds} = require("../utils/api");
const {getMutualGuilds, getFilterGuilds} = require("../utils/utils");
const User = require("../database/schemas/user")
router.get("/guilds",async(req,res) => {
    const guilds = await getBotGuilds();
    const user = await User.findOne({
        discordId: req.user.discordId,

    });
    if(user){
    const userGuilds = user.get('guilds');
    const mutualGuilds = getMutualGuilds(userGuilds,guilds);
    res.send(mutualGuilds);
    }
});
router.get("/noguilds",async(req,res) => {
    const guilds = await getBotGuilds();
    const user = await User.findOne({
        discordId: req.user.discordId,

    });
    if(user){
    const userGuilds = user.get('guilds');
    const filterGuilds = getFilterGuilds(userGuilds,guilds);
    res.send(filterGuilds);
    }
});
module.exports = router;