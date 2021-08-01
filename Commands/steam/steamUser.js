const Discord = require('discord.js');
const https = require("https");
module.exports = function steamuser(client, mess, args, systemColor) {
    try{
    const urlParser = (arr) => {
        let lengths;
        let lengthstart;
        arr.slice(27,35) == "profiles" ? lengthstart = 36 : lengthstart = 30;
        arr[arr.length] == "/" ? lengths = arr.length-1 : lengths = arr.length;
        if(arr.slice(0,8) == "https://")  {
            return arr.slice(lengthstart,lengths);
        }
        else if(arr.slice(0,22) == "steamcommunity.com/id/") return arr.slice(22,lengths);
        else if(arr.slice(0,29) == "steamcommunity.com/profiles/") return arr.slice(29,lengths);
        else return arr;
    }
    https.get(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=52DC9C9E096E3A843FEE7FE85A595FA9&vanityurl=${urlParser(args[1])}`,(res) =>{
        let bodyCount = '';
        res.on("data", (dataCount) =>{
            bodyCount += dataCount;
        })
        res.on("end", () => {
            bodyCount = JSON.parse(bodyCount);
            let steamid;
            if(bodyCount.response.steamid){
                steamid = bodyCount.response.steamid;
            }
            else steamid = urlParser(args[1]);
            https.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=52DC9C9E096E3A843FEE7FE85A595FA9&steamids=${steamid}`, (res) => {
                let bodyCount = '';
                res.on("data", (dataCount) =>{
                    bodyCount += dataCount;
                });
                res.on("end" ,() =>{
                    bodyCount = JSON.parse(bodyCount);
                    if(bodyCount.response.players.length == 0) return mess.channel.send("По вашему запросу я ничего не нашел.Возможно вы ввели:"+
                    "\n 1.имя пользователя неверно"+
                    "\n 2.неверную ссылку"+
                    "\n 3.ID пользователя неверно");
                    const urlUser = bodyCount.response.players[0].profileurl;
                    const urlAvatar = bodyCount.response.players[0].avatarfull;
                    const userName = bodyCount.response.players[0].personaname;
                    const date = new Date(bodyCount.response.players[0].timecreated*1000);
                    const timeCreated = date.toLocaleDateString();
                    let gameactivity;
                    if(bodyCount.response.players[0].gameextrainfo) gameactivity = bodyCount.response.players[0].gameextrainfo
                    else gameactivity = "Отсутствует";
                    let status;
                    bodyCount.response.players[0].personastate == 1 ? status = "Онлайн": status="Офлайн";
                    https.get(`https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=52DC9C9E096E3A843FEE7FE85A595FA9&steamid=${steamid}`, (res) =>{
                        let bodyCount = '';
                        res.on("data", (dataCount) =>{
                            bodyCount+=dataCount;
                        });
                        res.on("end", () =>{
                            bodyCount = JSON.parse(bodyCount);
                            console.log(bodyCount);
                            console.log(bodyCount.response.player_level);
                            const level = bodyCount.response.player_level;
                            https.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=52DC9C9E096E3A843FEE7FE85A595FA9&steamid=${steamid}`, (res)=>{
                                let bodyCount ='';
                                res.on("data", (dataCount) =>{
                                    bodyCount += dataCount;
                                });
                                res.on("end", () =>{
                                    bodyCount = JSON.parse(bodyCount);
                                    const gameCount = bodyCount.response.game_count;
                                    let date = 0;
                                    for(let i = 0; i<bodyCount.response.games.length;i++)
                                    {
                                        date+=bodyCount.response.games[i].playtime_forever;
                                    }
                                    date = parseInt(date/60);
                                    const embed = new Discord.MessageEmbed()
                                    .setURL(urlUser)
                                    .setThumbnail(urlAvatar)
                                    .setTitle(userName)
                                    .addFields(
                                        {name:"Игры",value:gameCount , inline: true},
                                        {name:"Уровень",value:level, inline: true},
                                        {name:"Статус",value:status, inline: true},
                                        {name:"Наиграно часов",value:date, inline: true},
                                        {name:"Игровая активность",value:gameactivity, inline: true},
                                        {name:"Дата создания",value:timeCreated, inline: true},
                                    )
                                    .setColor(systemColor);
                                    mess.channel.send(embed);
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
catch(e){
    mess.channel.send("По вашему запросу я ничего не нашел.Возможно вы ввели:"+
    "\n 1.имя пользователя неверно"+
    "\n 2.неверную ссылку"+
    "\n 3.ID пользователя неверно");
}
}