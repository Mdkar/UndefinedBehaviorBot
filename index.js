require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
    console.log("Bot is ready")
})

client.on("messageCreate", msg => {
    if (msg.content === "hey") {
        msg.reply("hi there")
    } else if (msg.content === "u good bro") {
        msg.channel.send("nah")
    } else if (msg.content === "rtn is epic") {
        msg.react("❤️")
    }
})