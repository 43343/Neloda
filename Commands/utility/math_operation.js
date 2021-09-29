const Discord = require('discord.js');
module.exports = function math(client, mess, args, systemColor) {
	const countArray = function(args){
    let result = 0;
    for(i = 0; i < args.length; i++)
        result++;
    return result;
    }
	if(countArray(args) < 3) 
		{
			const embed = new Discord.MessageEmbed()
			.setDescription('**Команда "!!вычислить"**' +
'\n**Использование**' +
'\n```!!вычислить <выражение>```'+
'\n**Пример**'+
'\n```!!вычислить 2+2'+
'\n┗ Вернёт 4.```')
        .setColor(systemColor);
		mess.channel.send({embeds:[embed]})
		return;
		}
	var s = '';
	for (i=1;i<args.length;i++)
	{
		s+= args[i] + ' ';
	}
	console.log(s);
	var str = '';
	try{
    for(i =0; i<s.length;i++)
	{
		if(s[i] == ',')
		{	
		    str += '.';
		}
		else{
			str += s[i];
		}
	}
	console.log(str);
	var FNs = new Function('return ' + str);
	const FN = FNs();
    if (FN !== undefined) {
      mess.channel.send({content:str + '=' + FN})
    }
	}
	catch(e){
		const embed = new Discord.MessageEmbed().setDescription('**Команда "!!вычислить"**' +
'\n**Использование**' +
'\n```!!вычислить <выражение>```'+
'\n**Пример**'+
'\n```!!вычислить 2+2'+
'\n┗ Вернёт 4.```').setColor(systemColor);
		mess.channel.send({embeds:[embed]})
	}
}