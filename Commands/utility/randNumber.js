const Discord = require('discord.js');
module.exports = function rand(client, mess, args,systemColor) {
	let finalVal;
	const countArray = function(args){
    let result = 0;
    for(i = 0; i < args.length; i++)
        result++;
    return result;
    }
    if(countArray(args) == 4)
	{
		const min = parseInt(args[1]);
		const max = parseInt(args[2]) + 1;
		finalVal = Math.floor(Math.random() * (max - min)) + min;
		mess.channel.send({content:finalVal.toString()});
	}
	else if(countArray(args) == 3)
	{
		const min = parseInt(args[1]);
		finalVal = Math.floor(Math.random() * min);
		mess.channel.send({content:finalVal.toString()});
	}
	if(isNaN(finalVal))
	{
		const embed = new Discord.MessageEmbed().setDescription('**Команда "!!ранд"**'+
'\nПолучить произвольное число'+
'\nВозвращает произвольное число в зависимости от параметров:'+
'\n'+
'\n• с одним параметром возвращает число от 0 до указанного;'+
'\n• с двумя параметрами возвращает число в указанном диапазоне.'+
'\n**Использование**'+
'\n```!!ранд <число1> [число2]```'+
'\n**Пример 1**'+
'\n```!!ранд 100'+
'\n┗ Вернёт произвольное число от 0 до 100.```'+
'\n**Пример 2**'+
'\n```!!ранд 100 200'+
'\n┗ Вернёт произвольное число от 100 до 200.```').setColor(systemColor);
		mess.channel.send({embeds:[embed]})
	}
}