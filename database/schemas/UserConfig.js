const mongoose = require("mongoose");

const UserConfigSchema = new mongoose.Schema({
    guildID: String,
    userID: String,

    level:{
        type:Number,
        default:0,
    },
    points:{
        type:Number,
        default:0,
    },
    targetPoints:{
        type:Number,
        default:100,
    },
    levelMessage:{
        type:Number,
        default:0,
    },
    pointsMessage:{
        type:Number,
        default:0,
    },
    targetPointsMessage:{
        type:Number,
        default:75,
    },
    levelVoice:{
        type:Number,
        default:0,
    },
    pointsVoice:{
        type:Number,
        default:0,
    },
    targetPointsVoice:{
        type:Number,
        default:75,
    },
    voiceSecond:{
        type:Number,
        default:0
    },
    messageCount:{
        type:Number,
        default:0
    },
    hotdogCount:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("UserConfig", UserConfigSchema);