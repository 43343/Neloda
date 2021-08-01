const Discord = require('discord.js');
module.exports = function quizstop(client, mess, args) {
    runQuiz.delete(mess.guild.id);
    mess.channel.send("Викторина скоро будет остановлена");
}