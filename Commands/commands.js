const Discord = require('discord.js');
const cat = require('./animals/cat.js')
const dog = require('./animals/dog.js')
const fox = require('./animals/fox.js')
const hare = require('./animals/hare.js')
const wolf = require('./animals/wolf.js')
const ball = require('./enterteinment/ball.js');
const knb = require('./enterteinment/knb.js');
const monetka = require('./enterteinment/monetka.js');
const youtube = require('./enterteinment/youtube.js');
const avatar = require('./information/avatar.js');
const rang = require('./information/rang.js');
const ban = require('./moderation/ban.js');
const kick = require('./moderation/kick.js');
const mute = require('./moderation/mute.js');
const removeWarn = require('./moderation/removeWarn.js');
const resetWarn = require('./moderation/resetWarn.js');
const warn = require('./moderation/warn.js');
const warns = require('./moderation/warns.js');
const current = require('./music/current.js');
const here = require('./music/here.js');
const mix = require('./music/mix.js');
const play = require('./music/play.js');
const pouse = require('./music/pouse.js');
const queue = require('./music/queue.js');
const repeat = require('./music/repeat.js');
const skip = require('./music/skip.js');
const start = require('./music/start.js');
const stop = require('./music/stop.js');
const volume = require('./music/volume.js');
const quizstart = require('./quiz/quizstart.js');
const quizstop = require('./quiz/quizstop.js');
const randsteam = require('./steam/randsteam.js')
const steam = require('./steam/steam.js')
const steamUser = require('./steam/steamUser.js')
const math = require('./utility/math_operation.js');
const rand = require('./utility/randNumber.js');
const poll = require('./utility/poll.js');

var comms_list = [
  //animals
  {
    name: "кот",
    out: cat,
  },
  {
    name: "пес",
    out: dog,
  },
  {
    name: "лиса",
    out: fox,
  },
  {
    name: "заяц",
    out: hare,
  },
  {
    name: "волк",
    out: wolf,
  },
  //enterteinment
  {
    name: "шар",
    out: ball,
  },
  {
    name: "монетка",
    out: monetka,
  },
  {
    name: "кнб",
    out: knb,
  },
  {
    name: "ютуб",
    out: youtube,
  },
  //information
  {
    name: "аватар",
    out: avatar,
  },
  {
    name: "ранг",
    out: rang,
  },
  //moderation
  {
    name: "бан",
    out: ban.ban,
  },
  {
    name: "разбан",
    out: ban.unban,
  },
  {
    name: "кик",
    out: kick,
  },
  {
    name: "мьют",
    out: mute.mute,
  },
  {
    name: "размьют",
    out: mute.unmute,
  },
  {
    name: "снятьпред",
    out: removeWarn,
  },
  {
    name: "сброспред",
    out: resetWarn,
  },
  {
    name: "пред",
    out: warn,
  },
  {
    name: "преды",
    out: warns,
  },
  //music
  {
    name: "текущая",
    out: current,
  },
  {
    name: "сюда",
    out: here,
  },
  {
    name: "перемешать",
    out: mix,
  },
  {
    name: "плей",
    out: play,
  },
  {
    name: "пауза",
    out: pouse,
  },
  {
    name: "очередь",
    out: queue,
  },
  {
    name: "повтор",
    out: repeat,
  },
  {
    name: "скип",
    out: skip,
  },
  {
    name: "старт",
    out: start,
  },
  {
    name: "стоп",
    out: stop,
  },
  {
    name: "громкость",
    out: volume,
  },
  //quiz
  {
    name: "quizstart",
    out: quizstart,
  },
  {
    name: "quizstop",
    out: quizstop,
  },
  //steam
  {
    name: "рандстим",
    out: randsteam,
  },
  {
    name: "стим",
    out: steam,
  },
  {
    name: "стимюзер",
    out: steamUser,
  },
  //utility
  {
    name: "вычислить",
    out: math,
  },
  {
    name: "ранд",
    out: rand,
  },
  {
    name: "опрос",
    out: poll,
  },]

module.exports.comms = comms_list;