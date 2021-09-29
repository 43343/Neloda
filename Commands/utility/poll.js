const Discord = require('discord.js');
module.exports = function poll(client, mess, args, systemColor) {
	const countArray = function(args){
    let result = 0;
    for(i = 0; i < args.length; i++)
        result++;
    return result;
    }
	if(countArray(args) > 2) 
	{
	let parameter = '';
	for (i=1;i<args.length;i++)
	{
		parameter+= args[i] + ' ';
	}
	let current = false;
		let cur = 0;
		let curr = 0;
		let count = [];
		let answers = '';
		for (i = 0 ; i< parameter.length;i++)
		{
			if(parameter[i] == '"')
			{
				if(current) {
					current = false;
					count[cur] = parameter.slice(curr, i);
					cur++;
				}
				else {
					current = true;
					curr = i+1;
				}
			}
			
		}
		if(cur <= 1) {
			if(cur == 0)
			count[0] = parameter;
			else count[0] = parameter.slice(1,parameter.length-1 );
		 answers += '**✅ - да **' +
		  '\n**❌ - нет **';
		}
		for(i = 1; i<cur;i++)
		{
			switch(i)
			{
				case 1: answers += '**1⃣ - ' + count[i] + '**';
				break;
				case 2: answers += '\n**2⃣ - '+ count[i] +'**';
				break;
				case 3: answers += '\n**3⃣ - '+ count[i] +'**';
				break;
				case 4: answers += '\n**4⃣ - '+ count[i] +'**';
				break;
				case 5: answers += '\n**5⃣ - '+ count[i] +'**';
				break;
				case 6: answers += '\n**6⃣ - '+ count[i] +'**';
				break;
				case 7: answers += '\n**7⃣ - '+ count[i] +'**';
				break;
				case 8: answers += '\n**8⃣ - '+ count[i] +'**';
				break;
				case 9: answers += '\n**9⃣ - '+ count[i] +'**';
				break;
				case 10: answers += '\n**0⃣ - '+ count[i] +'**';
				break;
			}
		}
		const embed = new Discord.MessageEmbed()
		.setDescription(`___**${count[0]}**___` +'\n\n' + answers)
		.setFooter('Опрос создал ' + mess.author.username, mess.author.displayAvatarURL())
		.setColor(systemColor);
		mess.channel.send({embeds:[embed]}).then( (message) => {
		if(cur <= 1)
        {
            message.react("✅");
            message.react("❌");
        }
        for(i = 1; i<cur;i++)
        {
            switch(i)
            {
                case 1: message.react("1⃣");
                    break;
                case 2: message.react('2⃣');
                    break;
                case 3: message.react('3⃣');
                    break;
                case 4: message.react('4⃣');
                    break;
                case 5: message.react('5⃣');
                    break;
                case 6: message.react('6⃣');
                    break;
                case 7: message.react('7⃣');
                    break;
                case 8: message.react('8⃣');
                    break;
                case 9: message.react('9⃣');
                    break;
                case 10: message.react('0⃣');
                    break;
            }
        }
		}).catch(() => {
			
		});
	}
	else {
		const embed = new Discord.MessageEmbed().setDescription('**Команда "!!опрос"**'+
'\n**Пример 1**'+
'\n```!!опрос <текст вопроса>```'+
'\n**Пример 2**'+
'\n```!!опрос "<текст вопроса>" "<вариант ответа 1>" "<вариант ответа 2>" "<вариант ответа 3>" (ковычки использовать обязательно, максисмальное колличество вариантов ответа 10)```').setColor(systemColor);
		mess.channel.send({embeds:[embed]})
	}
}