const Discord = require('discord.js');
const quiz = require('./quiz.json');
module.exports = function quizstart(client, mess, args, systemColor) {
    if(runQuizCurrent.get(mess.guild.id)) mess.channel.send("Викторина уже запущена")
    else{
    runQuiz.set(mess.guild.id,true);
    runQuizCurrent.set(mess.guild.id,true);
    const embed = new Discord.MessageEmbed()
    .setDescription("Викторина скоро начнется. Для участия нажмите на ✅")
    .setColor(systemColor);
    mess.channel.send({embeds:[embed]}).then((msg) =>{
        msg.react("✅").then((reaction) => setTimeout(() => participiant(reaction,mess,systemColor),30000));
    });
}
}
function participiant(reaction,mess,systemColor){
    const participiants = reaction.users.cache.map(user => user.id);
    const embed = new Discord.MessageEmbed();
    let embedDescription = '';
    console.log(participiants);
    if(participiants.length < 3){
        embed.setDescription("Слишком мало участников для того, чтобы начать виктарину");
        embed.setColor(systemColor);
        runQuiz.delete(mess.guild.id);
        runQuizCurrent.delete(mess.guild.id);
        return mess.channel.send({embeds:[embed]});
    }
    for(let i = 1;i<participiants.length;i++){
        embedDescription += `\n ${i} - <@${participiants[i]}> - 0 pts`;
    }
    embed.setThumbnail("https://e7.pngegg.com/pngimages/470/133/png-clipart-quiz-guess-word-trivia-history-quiz-game-quiz-miscellaneous-game.png")
    embed.setDescription(`__**СПИСОК УЧАСТНИКОВ**__ \n ${embedDescription}`);
    embed.setColor(systemColor);
    mess.channel.send({embeds:[embed]});
    let participiantsArray = [];
    for(let i = 1;i< participiants.length;i++){
        participiantsArray.push({id:participiants[i],pts:0});
    }
    if(runQuiz.get(mess.guild.id))setTimeout(() => quizGenerator(mess,participiantsArray,systemColor),30000);
    else{ 
        runQuizCurrent.delete(mess.guild.id);
        mess.channel.send({content:"Викторина была остановлена"});
    }
}
function quizGenerator(mess,participiants,systemColor){
    const embed = new Discord.MessageEmbed();
    const random = Math.floor(Math.random() * quiz.quiz.length)
    let discription = `___**${quiz.quiz[random].question}**___ 
    \n 1⃣ - ${quiz.quiz[random].answers[0]}\n 2⃣ - ${quiz.quiz[random].answers[1]}`
    console.log(quiz.quiz[random].answers.length)
    if(quiz.quiz[random].answers.length >= 3) discription += `\n 3⃣ - ${quiz.quiz[random].answers[2]}`;
    if(quiz.quiz[random].answers.length == 4) discription += `\n 4⃣ - ${quiz.quiz[random].answers[3]}`;
    embed.setDescription(discription)
    .setFooter(`У вас ${quiz.quiz[random].time} секунд чтобы ответить на вопрос`, 'https://img.favpng.com/13/19/4/vector-graphics-stock-illustration-clip-art-stock-photography-image-png-favpng-yVLas3sNtqf4FZ9a7kzpNPGxe.jpg')
    .setColor(systemColor);
    if(quiz.quiz[random].imageAttachment) embed.setImage(quiz.quiz[random].imageAttachment);
    mess.channel.send({embeds:[embed]}).then((msg) =>{
        let peopleRespond = [];
        msg.react("1⃣");
        msg.react("2⃣");
        if(quiz.quiz[random].answers.length >= 3)msg.react("3⃣");
        if(quiz.quiz[random].answers.length == 4)msg.react("4⃣");
        let isContinued = false;
        const filter = (reaction, user) => {
            console.log(user.id);
            for(let i =0;i<participiants.length;i++){
                if(user.id === participiants[i].id) isContinued = true;
            }
            console.log(isContinued);
            return true;
        }
        let collector = msg.createReactionCollector(filter,{time:quiz.quiz[random].time * 1000});

        //Обработка нажатых реакций
        collector.on('collect', (reaction, user) => {
            if (reaction.emoji.name === '1⃣') {
                let particip = false;
                console.log(particip)
                for(let i =0;i<participiants.length;i++){
                    if(user.id === participiants[i].id) particip = true;
                }
                console.log(particip)
                if(!particip) return;
                if(quiz.quiz[random].verifyedAnswer === 1){
                    let respond = false;
                    for(let i = 0;i<peopleRespond.length;i++){
                        if(user.id === peopleRespond[i]) respond = true;
                    }
                    console.log(respond);
                    if(!respond) {
                        for(let i =0;i<participiants.length;i++){
                            if(user.id === participiants[i].id) participiants[i].pts+=quiz.quiz[random].pts;
                        }
                    }
                }
                peopleRespond.push(user.id);
                console.log(peopleRespond);
            }
            if (reaction.emoji.name === '2⃣') {
                let particip = false;
                console.log(particip)
                for(let i =0;i<participiants.length;i++){
                    if(user.id === participiants[i].id) particip = true;
                }
                console.log(particip)
                if(!particip) return;
                if(quiz.quiz[random].verifyedAnswer === 2){
                    let respond = false;
                    for(let i = 0;i<peopleRespond.length;i++){
                        if(user.id === peopleRespond[i]) respond = true;
                    }
                    console.log(respond);
                    if(!respond) {
                        for(let i =0;i<participiants.length;i++){
                            if(user.id === participiants[i].id) participiants[i].pts+=quiz.quiz[random].pts;
                        }
                    }
                }
                peopleRespond.push(user.id);
                console.log(peopleRespond);
            }
            if (reaction.emoji.name === '3⃣') {
                let particip = false;
                console.log(particip)
                for(let i =0;i<participiants.length;i++){
                    if(user.id === participiants[i].id) particip = true;
                }
                console.log(particip)
                if(!particip) return;
                if(quiz.quiz[random].verifyedAnswer === 3){
                    let respond = false;
                    for(let i = 0;i<peopleRespond.length;i++){
                        if(user.id === peopleRespond[i]) respond = true;
                    }
                    console.log(respond);
                    if(!respond) {
                        for(let i =0;i<participiants.length;i++){
                            if(user.id === participiants[i].id) participiants[i].pts+=quiz.quiz[random].pts;
                        }
                    }
                }
                peopleRespond.push(user.id);
                console.log(peopleRespond);
            }
            if (reaction.emoji.name === '4⃣') {
                let particip = false;
                console.log(particip)
                for(let i =0;i<participiants.length;i++){
                    if(user.id === participiants[i].id) particip = true;
                }
                console.log(particip)
                if(!particip) return;
                if(quiz.quiz[random].verifyedAnswer === 4){
                    let respond = false;
                    for(let i = 0;i<peopleRespond.length;i++){
                        if(user.id === peopleRespond[i]) respond = true;
                    }
                    console.log(respond);
                    if(!respond) {
                        for(let i =0;i<participiants.length;i++){
                            if(user.id === participiants[i].id) participiants[i].pts+=quiz.quiz[random].pts;
                        }
                    }
                }
                peopleRespond.push(user.id);
                console.log(peopleRespond);
            }
        })
        collector.on('end', collected => {
            msg.delete() //Удаляем сообщение
            if(isContinued)leaderBords(mess,participiants,systemColor);
       else {
       mess.channel.send({content:"Никто так и не ответил на вопрос :( Викторина была остановлена"});
       runQuizCurrent.delete(mess.guild.id);
       runQuiz.delete(mess.guild.id);
       }
        });

    });
}
function leaderBords(mess,participiants,systemColor){
    participiants.sort((a,b) => b.pts - a.pts);
    console.log(participiants);
    const embed = new Discord.MessageEmbed();
    let embedDescription = '';
    for(let i = 0;i<participiants.length;i++){
        if(i === 0) embedDescription += `\n 🥇 - <@${participiants[i].id}> - ${participiants[i].pts} pts`;
        if(i === 1) embedDescription += `\n 🥈 - <@${participiants[i].id}> - ${participiants[i].pts} pts`;
        if(i === 2) embedDescription += `\n 🥉 - <@${participiants[i].id}> - ${participiants[i].pts} pts`;
        if(i > 2 && i < 11) embedDescription += `\n ${i} - <@${participiants[i].id}> - ${participiants[i].pts} pts`;
    }
    embed.setThumbnail("https://e7.pngegg.com/pngimages/470/133/png-clipart-quiz-guess-word-trivia-history-quiz-game-quiz-miscellaneous-game.png")
    .setDescription(`__**ТАБЛИЦА ЛИДЕРОВ**__ \n ${embedDescription}`)
    .setColor(systemColor);
    mess.channel.send(embed);
    if(runQuiz.get(mess.guild.id)) setTimeout(() => quizGenerator(mess,participiants,systemColor),30000);
    else{
        runQuizCurrent.delete(mess.guild.id);
         mess.channel.send("Викторина была остановлена");
    }
}