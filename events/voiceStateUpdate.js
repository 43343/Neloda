const Discord = require('discord.js');
const GuildConfig = require("../database/schemas/GuildConfig");
const UserConfig = require("../database/schemas/UserConfig");
const storingDateJoiningVoiceChannel = new Map();
module.exports = (client) => {
    client.on('voiceStateUpdate', async (oldMember, newMember) => {
        if ((oldMember.member && oldMember.member.user.bot) || (newMember.member && newMember.member.user.bot)) {
            return;
        }
        let userConfig;
    if(oldMember.channel && !newMember.channel)
    {
        if(storingDateJoiningVoiceChannel.get(oldMember.id)){
        const second = Math.floor((Date.now() - storingDateJoiningVoiceChannel.get(oldMember.id))/1000);
        userConfig = await UserConfig.findOne({
            guildID:newMember.guild.id,
            userID:newMember.id
        });
        console.log(second);
        console.log(userConfig.voiceSecond);
        userConfig.voiceSecond += second;
        if(Math.floor(second/60) > 0){
            userConfig.points += 4 * Math.floor(second/60);
            userConfig.pointsVoice += 2 * Math.floor(second/60);
            while(userConfig.points >= userConfig.targetPoints){
                userConfig.points -= userConfig.targetPoints;
                userConfig.level++;
                if(userConfig.level < 50)userConfig.targetPoints = Math.floor(userConfig.targetPoints*1.5);
        else if(userConfig.level < 100)userConfig.targetPoints = Math.floor(userConfig.targetPoints*1.06);
        else if(userConfig.level < 200)userConfig.targetPoints = Math.floor(userConfig.targetPoints*1.01);
        else userConfig.targetPoints = Math.floor(userConfig.targetPoints*1.001);
              }
              while(userConfig.pointsVoice >= userConfig.targetPointsVoice){
                userConfig.pointsVoice -= userConfig.targetPointsVoice;
                userConfig.levelVoice++;
                if(userConfig.levelVoice < 50)userConfig.targetPointsVoice = Math.floor(userConfig.targetPointsVoice*1.5);
        else if(userConfig.levelVoice < 100)userConfig.targetPointsVoice = Math.floor(userConfig.targetPointsVoice*1.06);
        else if(userConfig.levelVoice < 200)userConfig.targetPointsVoice = Math.floor(userConfig.targetPointsVoice*1.01);
        else userConfig.targetPointsVoice = Math.floor(userConfig.targetPointsVoice*1.001);
              }
        }
        userConfig.save();
        storingDateJoiningVoiceChannel.delete(oldMember.id)
    }
    }
    else{
        userConfig = await UserConfig.findOne({
            guildID:newMember.guild.id,
            userID:newMember.id
        });
        if(!userConfig){
            UserConfig.create({
                guildID:newMember.guild.id,
                userID:newMember.id
              });
        }
        storingDateJoiningVoiceChannel.set(newMember.id,Date.now());
        console.log(storingDateJoiningVoiceChannel);
    }
  });
}