const mongoose = require("mongoose");

const GuildConfigSchema = new mongoose.Schema({
    guildId:{
        type:mongoose.SchemaTypes.String,
        required:true,
        unique:true,
    },
    prefix:{
        type:mongoose.SchemaTypes.String,
        required:true,
        default:`!!`,
    },
    systemColor:{
        type:mongoose.SchemaTypes.String,
        required:true,
        default:`#0822E7`,
    },
    defaultRole:{
        type:mongoose.SchemaTypes.String,
        required:false,
    },
    memberLogChannel:{
        type: mongoose.SchemaTypes.String,
        required:false,
    }
})

module.exports = mongoose.model("GuildConfig", GuildConfigSchema);