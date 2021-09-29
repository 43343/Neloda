const Discord = require('discord.js');
module.exports = function ball(client, mess, args) {
	const countArray = function(args){
    let result = 0;
    for(i = 0; i < args.length; i++)
        result++;
    return result;
    }
	const str = ["Определенно да :thumbsup:", "Определенно нет :x:" , "Спроси в следующий раз :eyes:", "Думаю что нет :no_entry_sign: ", "Сомневаюсь :neutral_face:", "Хорошие перспективы :thumbsup:", "Никаких сомнений :thumbsup:",
	"Сконцентрируйся и спроси еще разок :eyes:", "Да :ok_hand:", "Можешь быть уверен в этом :thumbsup:", "Мне кажется — да :ok_hand:"];
	if(countArray(args) >2) mess.channel.send({content:str[Math.floor(Math.random() * str.length)]});
	else mess.channel.send({content:'Задай мне вопрос, пожалуйста'});
}
