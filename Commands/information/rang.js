const Discord = require('discord.js');
const Canvas = require('canvas');
const UserConfig = require("../../database/schemas/UserConfig");
module.exports = async function rang(client, mess, args,) {
    const canvas = Canvas.createCanvas(700, 200);
    const context = canvas.getContext('2d');
    let user = mess.mentions.users.first()  || mess.author;
    if(user.bot) user = mess.author;
    let userConfig = await UserConfig.findOne({
        guildID:mess.guild.id,
        userID:user.id
    });
    if(!userConfig){
        userConfig = new UserConfig({
            guildID:mess.guild.id,
            userID:user.id
          });
          userConfig.save();
    }
    const timestampVoice = userConfig.get(`voiceSecond`);
    const hoursVoice = Math.floor(timestampVoice/60/60);
    const minutesVoice = Math.floor(timestampVoice/60) - (hoursVoice * 60);
    const secondsVoice = timestampVoice % 60;
    const dlinaPoloskiPoints = 450 * (userConfig.get(`points`)/userConfig.get(`targetPoints`));
    const vityagivaniePoloskiPoints = 25 * (userConfig.get(`points`)/userConfig.get(`targetPoints`));
    const dlinaPoloskiPointsVoice = 450 * (userConfig.get(`pointsVoice`)/userConfig.get(`targetPointsVoice`));
    const vityagivaniePoloskiPointsVoice = 25 * (userConfig.get(`pointsVoice`)/userConfig.get(`targetPointsVoice`));
    const dlinaPoloskiPointsMessage = 450 * (userConfig.get(`pointsMessage`)/userConfig.get(`targetPointsMessage`));
    const vityagivaniePoloskiPointsMessage = 25 * (userConfig.get(`pointsMessage`)/userConfig.get(`targetPointsMessage`));
    context.fillStyle = "#FABA44";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "rgba(225,203,253,1)";
    context.moveTo(175,70);
    context.lineTo(175,85);
    context.lineTo(175+dlinaPoloskiPointsVoice,85);
    context.lineTo(175+dlinaPoloskiPointsVoice+vityagivaniePoloskiPointsVoice,70);
    context.fill();
    context.moveTo(175,130);
    context.lineTo(175,145);
    context.lineTo(175+dlinaPoloskiPointsMessage,145);
    context.lineTo(175+dlinaPoloskiPointsMessage+vityagivaniePoloskiPointsMessage,130);
    context.fill();
    /*context.fillStyle = "rgba(225,203,253,1)";
    context.moveTo(175,115);
    context.lineTo(175,130);
    context.lineTo(175 + dlinaPoloskiPoints,130);
    context.lineTo(175 + dlinaPoloskiPoints +vityagivaniePoloskiPoints,115);
    context.fill();*/
	context.closePath();
    context.beginPath();
	context.arc(70, 100, 60, 0, Math.PI*2, true);
    context.font = '20px sans-serif';
	context.fillStyle = 'rgba(255,255,255,1)';
	context.fillText(user.username + "#" + user.discriminator, 175, 195);
    let imgHotdog = new Canvas.Image;
    context.textAlign = "end";
    imgHotdog.src = "./hotdog.svg";
    let positionHotdog;
    switch(userConfig.get(`hotdogCount`).toString().length)
    {
        case 1: positionHotdog = 610; break;
        case 2: positionHotdog = 598; break;
        case 3: positionHotdog = 586; break;
        case 4: positionHotdog = 574; break;
        case 5: positionHotdog = 562; break;
    }
    context.drawImage(imgHotdog,positionHotdog,178,15,20);
    context.fillText(userConfig.get(`hotdogCount`), 644, 195);
    context.textAlign = "start";
    context.fillText(`LVL ${userConfig.get(`levelVoice`)}`, 175, 68);
    let imgMicrophone = new Canvas.Image;
    imgMicrophone.src = "./microphone.svg";
    context.drawImage(imgMicrophone,175,86,15,20);
    context.fillText(`${hoursVoice.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${minutesVoice.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${secondsVoice.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`, 202, 103);
      context.textAlign = "end";
    context.fillText(`${userConfig.get(`pointsVoice`)}/${userConfig.get(`targetPointsVoice`)} EXP`, 640, 68);
    context.textAlign = "start";
    context.moveTo(175,70);
    context.lineTo(175,85);
    context.lineTo(625,85);
    context.lineTo(650,70);
    context.fillText(`LVL ${userConfig.get(`levelMessage`)}`, 175, 128);
    let imgChat = new Canvas.Image;
    imgChat.src = "./chat.svg";
    context.drawImage(imgChat,175,144,20,20);
    context.fillText(userConfig.get(`messageCount`), 202, 161);
    context.textAlign = "end";
    context.fillText(`${userConfig.get(`pointsMessage`)}/${userConfig.get(`targetPointsMessage`)} EXP`, 640, 128);
    context.fillStyle = "rgba(115,203,253,0.562)";
    context.moveTo(175,130);
    context.lineTo(175,145);
    context.lineTo(625,145);
    context.lineTo(650,130);
    context.fill();
	/*context.fillText(`LVL ${userConfig.get(`level`)}`, 175, 110);
    let imgChat = new Canvas.Image;
    imgChat.src = "./chat.svg";
    context.drawImage(imgChat,175,130,20,20);
    context.fillText(userConfig.get(`messageCount`), 202, 147);
    let imgMicrophone = new Canvas.Image;
    let positionMicrophone;
    switch(userConfig.get(`messageCount`).toString().length)
    {
        case 1: positionMicrophone = 232; break;
        case 2: positionMicrophone = 243; break;
        case 3: positionMicrophone = 254; break;
        case 4: positionMicrophone = 265; break;
        case 5: positionMicrophone = 276; break;
        case 6: positionMicrophone = 287; break;
        case 7: positionMicrophone = 298; break;
    }
    imgMicrophone.src = "./microphone.svg";
    context.drawImage(imgMicrophone,positionMicrophone,130,15,20);
    context.fillText(`${hoursVoice.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${minutesVoice.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}:${secondsVoice.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })}`, positionMicrophone + 22, 147);
    context.textAlign = "end";
    context.fillText(`${userConfig.get(`points`)}/${userConfig.get(`targetPoints`)} EXP`, 640, 110);
    context.fillStyle = "rgba(115,203,253,0.562)";
    context.moveTo(175,115);
    context.lineTo(175,130);
    context.lineTo(625,130);
    context.lineTo(650,115);
    context.fill();*/
    context.closePath();
	context.clip();
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
	context.drawImage(avatar, 10, 40, 120, 120);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rang.png');
    mess.channel.send({files:[attachment]});
}