const Discord = require('discord.js');
const https = require("https");
const fs = require("fs");
module.exports = function steam(client, mess, args, systemColor) {
    const getAppId = () => {
        let isAppId = true;
        let ar = args[1];
        for(let i = 0;i< ar.length;i++){
            if(ar[i] == `/`) isAppId = false;
            console.log(isAppId);
        }
        if(isAppId){
            return `${ar}`;
        }
        else{
            let url = new URL(ar);
            console.log(url.pathname);
            if(url.hostname == "steamcommunity.com") return `${url.pathname.slice(5,url.pathname.length)}`
            else if(url.hostname == "store.steampowered.com"){
              let kolvoDrobe = 0;
              let finalAppId = "";
              for(let i = 0; i<url.pathname.length; i++){
                if(url.pathname[i] == "/") kolvoDrobe++;
                else if(kolvoDrobe == 2) finalAppId += url.pathname[i];
              }
              console.log(finalAppId);
              return `${finalAppId}`;
            }
        }
    }
    https.get(`https://store.steampowered.com/api/appdetails?appids=${getAppId()}&l=russian`, (res) => {
        let bodyCount = '';
        res.on("data", (dataCount) =>{
            bodyCount += dataCount;
        })
        res.on("end", ()=>{
            console.log(`https://store.steampowered.com/api/appdetails?appids=${getAppId()}&l=russian`);
            try{
            bodyCount = JSON.parse(bodyCount);
            console.log(getAppId())
            return getAppInfo(getAppId().toString());
            }
            catch(e){

            }
        })
    })
    fs.readFile("./Commands/steam/steamdatabase.txt", "utf8", 
            function(error,data){
                console.log("Асинхронное чтение файла");
                if(error) throw error; // если возникла ошибка
                let bodyCount = JSON.parse(data);
                let appid;
                for(let i = 0;i<bodyCount.applist.apps.length;i++){
                    if(bodyCount.applist.apps[i].name.toLowerCase().replace( /\s/g, '') === searchName()){
                        appid = bodyCount.applist.apps[i].appid;
                        console.log(appid);
                    }
                }
                if(!appid) return mess.channel.send("По вашему запросу я ничего не нашел.Возможно вы ввели:"+
                "\n 1.название игры неверно"+
                "\n 2.неверную ссылку"+
                "\n 3.AppID игры неверно");
                getAppInfo(appid);
                console.log(searchName());
    });
    const searchName = () => {
        let name = "";
        for(let i = 1;i<args.length;i++) {
            name += args[i];
        }
        return name.toLowerCase();
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
            https.get(`https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`,(res) =>{
                let bodyCount = "";
                res.on("data", (dataCount) =>{
                    bodyCount += dataCount;
                })
                res.on("end", () =>{
                    bodyCount = JSON.parse(bodyCount);
                    let online = bodyCount.response.player_count;
                    console.log(price);
                    console.log(online)
                    console.log(platforms)
                    console.log(releaseDate)
                    console.log(developers);
                    console.log(publishers)
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
            return mess.channel.send("По вашему запросу я ничего не нашел.Возможно вы ввели:"+
            "\n 1.название игры неверно"+
            "\n 2.неверную ссылку"+
            "\n 3.AppID игры неверно");
        }
        })
    })
}
}