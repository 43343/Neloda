const comms = require('../Commands/commands.js');
const Discord = require('discord.js');
const GuildConfig = require("../database/schemas/GuildConfig");
const UserConfig = require("../database/schemas/UserConfig");
const hotdogRecently = new Set();
module.exports = (client) => {
   global.queue = new Map();
   global.serverQueue;
   global.repeat = new Map();
   global.queueRepeat = new Map();
   global.queueRepeatMap = new Map();
    global.runQuiz = new Map();
    global.runQuizCurrent = new Map();
    client.on('message', async (msg) => {
      if (msg.author.username != client.user.username && msg.author.discriminator != client.user.discriminator) {
      if(!msg.guild) return;
      //выдача хотдогов
      if((msg.content.includes("🌭") && msg.mentions.users.first()) && (msg.mentions.users.first() !== msg.author)){
        const userHotdog = await UserConfig.findOne({
          guildID:msg.guild.id, 
          userID:msg.mentions.users.first().id
        });
        if(!userHotdog){
          userHotdog = new UserConfig({
            guildID:msg.guild.id,
            userID:msg.mentions.users.first().id
        })
        }
        if(!hotdogRecently.has(msg.author.id.toString() + msg.mentions.users.first().id.toString() + msg.guild.id.toString())){
          hotdogRecently.add(msg.author.id.toString() + msg.mentions.users.first().id.toString() + msg.guild.id.toString());
          userHotdog.hotdogCount += 1;
          userHotdog.save();
          setTimeout(() => hotdogRecently.delete(msg.author.id.toString() + msg.mentions.users.first().id.toString()),600000)
        }
      }
      //получаем system color и prefix из базы данных
    let guildConfig = await GuildConfig.findOne({guildId:msg.guild.id});
    if(!guildConfig){
      guildConfig = new GuildConfig({
        guildId:msg.guild.id
      });
    }
    const prefix = guildConfig.get(`prefix`); 
    const systemColor = guildConfig.get(`systemColor`); 
    //начисление опыта
      let user = await UserConfig.findOne({
        guildID:msg.guild.id, 
        userID:msg.author.id
      })
      if(!user){
        user = new UserConfig({
          guildID:msg.guild.id,
          userID:msg.author.id
      })
      }
      user.messageCount++;
      user.points += 4;
      user.pointsMessage += 2;
      if(user.points >= user.targetPoints){
        if(user.level === 300) user.points = user.targetPoints;
        else {
        user.points -= user.targetPoints;
        user.level++;
        if(user.level < 50)user.targetPoints = Math.floor(user.targetPoints*1.5);
        else if(user.level < 100)user.targetPoints = Math.floor(user.targetPoints*1.06);
        else if(user.level < 200)user.targetPoints = Math.floor(user.targetPoints*1.01);
        else user.targetPoints = Math.floor(user.targetPoints*1.001);
        }
      }
      if(user.pointsMessage >= user.targetPointsMessage){
        if(user.levelMessage === 300) user.pointsMessage = user.targetPointsMessage;
        else {
        user.pointsMessage -= user.targetPointsMessage;
        user.levelMessage++;
        if(user.levelMessage < 50)user.targetPointsMessage = Math.floor(user.targetPointsMessage*1.5);
        else if(user.levelMessage < 100)user.targetPointsMessage = Math.floor(user.targetPointsMessage*1.06);
        else if(user.levelMessage < 200)user.targetPointsMessage = Math.floor(user.targetPointsMessage*1.01);
        else user.targetPointsMessage = Math.floor(user.targetPointsMessage*1.001);
        }
      }
      user.save();
      //использование команд
      var comm = msg.content.trim() + " ";
      var comm_name = comm.slice(0, comm.indexOf(" "));
      var messArr = comm.split(" ");
      for (comm_count in comms.comms) {
        var comm2 = prefix + comms.comms[comm_count].name;
        if (comm2 == comm_name) {
          comms.comms[comm_count].out(client, msg, messArr,systemColor);
        }
      }
    }
  });
}