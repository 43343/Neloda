const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
module.exports = function randsteam(client, mess, args, systemColor) {
    const urlParser = (arr) => {
        let lengths;
        let lengthstart;
        arr.slice(27,35) == "profiles" ? lengthstart = 36 : lengthstart = 30;
        arr[arr.length-1] == "/" ? lengths = arr.length-1 : lengths = arr.length;
        if(arr.slice(0,8) == "https://")  {
            return arr.slice(lengthstart,lengths);
        }
        else if(arr.slice(0,22) == "steamcommunity.com/id/") return arr.slice(22,lengths);
        else if(arr.slice(0,29) == "steamcommunity.com/profiles/") return arr.slice(29,lengths);
        else return arr;
    }
    if(args.length >2){
        console.log(args);
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
            https.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=52DC9C9E096E3A843FEE7FE85A595FA9&steamid=${steamid}`,(res) =>{
                let bodyCount = '';
                res.on("data", (dataCount) =>{
                    bodyCount+=dataCount;
                });
                res.on("end", () =>{
                    try{
                    bodyCount = JSON.parse(bodyCount);
                    return getAppInfo(bodyCount.response.games[Math.floor(Math.random() * bodyCount.response.games.length)].appid)
                    }
                    catch(e){
                        return randsteam(client, mess, [ args[0],  '' ])
                    }
                })
            })
        })
    })
}
else{
    fs.readFile("./Commands/steam/steamdatabase.txt", "utf8", 
            function(error,data){
                console.log("Асинхронное чтение файла");
                if(error) throw error; // если возникла ошибка
                let bodyCount = JSON.parse(data);
                getAppInfo(bodyCount.applist.apps[Math.floor(Math.random() * bodyCount.applist.apps.length)].appid);
    });
}
const getAppInfo = (appid) => {
    https.get(`https://store.steampowered.com/api/appdetails?appids=${appid}&l=russian`, (res) => {
        console.log(`https://store.steampowered.com/api/appdetails?appids=${appid}&l=russian`)
        let bodyCount = '';
        res.setEncoding("utf8");
        res.on("data", (dataCount) =>{
            bodyCount += dataCount;
        })
        res.on("end", ()=>{
            try{
                bodyCount = JSON.parse(bodyCount);
            }
            catch(e){
                return console.error(e);
            }
            try{
            console.log(bodyCount[appid].data.type);
            if(bodyCount[appid].data.type == "music") return randsteam(client, mess, args);
            if(bodyCount[appid].data.type == "dlc") return randsteam(client, mess, args);
            if(bodyCount[appid].data.type == "demo") return randsteam(client, mess, args);
            if(bodyCount[appid].data.type == "episode") return randsteam(client, mess, args);
            let nameGame = bodyCount[appid].data.name;
            let avatarGame = bodyCount[appid].data.header_image;
            let urlGame = `https://steamcommunity.com/app/${appid}`;
            let descriptions = bodyCount[appid].data.short_description;
            let price;
            if(bodyCount[appid].data.is_free){
                price = "Бесплатно";
            }
            else if(bodyCount[appid].data.price_overview){
            if(bodyCount[appid].data.price_overview.final_formatted){
                price = bodyCount[appid].data.price_overview.final_formatted;
            }
        }
            let platforms = "";
            if(bodyCount[appid].data.platforms.windows) platforms += "windows ";
            if(bodyCount[appid].data.platforms.mac) platforms += "mac ";
            if(bodyCount[appid].data.platforms.linux) platforms += "linux";
            if(platforms == "") platforms = "undefined";
            let releaseDate;
            if(bodyCount[appid].data.release_date.coming_soon) releaseDate = "Coming Soon";
            else if(bodyCount[appid].data.release_date.date) releaseDate = bodyCount[appid].data.release_date.date;
            let developers = "";
            let publishers = "";
            for(let i = 0; i< bodyCount[appid].data.developers.length;i++){
                developers += bodyCount[appid].data.developers[i];
                if(i != bodyCount[appid].data.developers.length-1) developers += ", ";
            }
            for(let i = 0; i< bodyCount[appid].data.publishers.length;i++){
                publishers += bodyCount[appid].data.publishers[i];
                if(i != bodyCount[appid].data.publishers.length-1) publishers += ", ";
            }
            if(developers == "") developers = "undefined";
            if(publishers == "") publishers = "undefined";
            https.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`,(res) =>{
                let bodyCount = "";
                res.on("data", (dataCount) =>{
                    bodyCount += dataCount;
                })
                res.on("end", () =>{
                    bodyCount = JSON.parse(bodyCount);
                    let online = bodyCount.response.player_count;
                    let embedMessage = new Discord.MessageEmbed()
                    .setTitle(nameGame)
                    .setURL(urlGame)
                    .setDescription(descriptions)
                    .setThumbnail(avatarGame)
                    .addFields(
                        {name:"Цена", value:price,inline:true},
                        {name:"Онлайн", value:online.toString(),inline:true},
                        {name:"Платформы", value:platforms,inline:true},
                        {name:"Дата выхода", value:releaseDate,inline:true},
                        {name:"Разработчик", value:developers,inline:true},
                        {name:"Издатель", value:publishers,inline:true},
                    )
                    .setColor(systemColor);
                    mess.channel.send({embeds:[embedMessage]});
                })
            })
        }
        catch(e){
            return randsteam(client, mess, args, systemColor);
        }
        })
    })
}
}