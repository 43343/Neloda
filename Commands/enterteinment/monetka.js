const Discord = require('discord.js');

module.exports = function monets(client, mess, args) {
	const countArray = function(args){
    let result = 0;
    for(i = 0; i < args.length; i++)
        result++;
    return result;
    }
	const str = ["орёл","решка","решка"];
	if((countArray(args) == 3) &&( args[1] == str[0] || args[1] == str[1]))
	{
		if(args[1] == str[Math.floor(Math.random()*str.length)])
		{
			mess.reply("ты угадал сторону монеты");
		}
		else mess.reply("ты не угадал сторону монеты");
	}
	else
	{
		mess.reply("ты должен выбрать либо решку, либо орла");
	}
}