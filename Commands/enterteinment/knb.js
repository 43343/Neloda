const Discord = require('discord.js');
module.exports = function knb(client, mess, args) {
    const countArray = function(args){
        let result = 0;
        for(i = 0; i < args.length; i++)
            result++;
        return result;
        }
        const str = ["камень","ножницы","бумага"];
        strRandom = str[Math.floor(Math.random()*str.length)]
        if((countArray(args) == 3) &&( args[1] == str[0] || args[1] == str[1] || args[1] == str[2]))
        {
            if(args[1] == strRandom)
            {
                let answer = ["видимо у нас ничья","ух ты! У нас целая ничья!","ух ты! У нас целая ничья!"];
                mess.reply(answer[Math.floor(Math.random()*answer.length)]);
            }
            else if((args[1] == "камень" && strRandom == "ножницы") || (args[1] == "ножницы" && strRandom == "бумага") || (args[1] == "бумага" && strRandom == "камень")){
                let answer = [`ты меня победил, но в следующий раз пощады не жди. Мой ответ: ${strRandom}`,`ты выйграл битву, но не войну. Мой ответ: ${strRandom}`,`ты выйграл битву, но не войну. Мой ответ: ${strRandom}`];
                mess.reply(answer[Math.floor(Math.random()*answer.length)]);
            }
            else if((args[1] == "ножницы" && strRandom == "камень") || (args[1] == "бумага" && strRandom == "ножницы") || (args[1] == "камень" && strRandom == "бумага")){
                let answer = [`ты был достойным противником, но победитель всегда один. Мой ответ: ${strRandom}`,`мне жаль, но вы проиграли. Мой ответ: ${strRandom}`,`ты выйграл битву, но не войну. Мой ответ: ${strRandom}`];
                mess.reply(answer[Math.floor(Math.random()*answer.length)]);
            }
            
        }
        else
        {
            mess.reply("ты должен выбрать либо камень, либо ножницы, либо бумагу, а иначе я играть не буду");
        }
}