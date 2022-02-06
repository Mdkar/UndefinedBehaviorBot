require("dotenv").config();
const { respond } = require("./respond.js");

const placeNameMap = {
    "abp": "Au Bon Pain",
    .addChoice("Back Bar Grill", "bbb")
    .addChoice("Beefsteak", "bs")
    .addChoice("Egg Shoppe", "eg")
    .addChoice("Cucina", "cc")
    .addChoice("Entropy", "ent")
    .addChoice("Exchange", "ecg")
    .addChoice("El Gallo de Oro", "gal")
    .addChoice("Grano", "gno")
    .addChoice("Hunan Express", "hun")
    .addChoice("Innovation Kitchen", "ink")
    .addChoice("La Prima", "lap")
    .addChoice("Nourish", "nrs")
    .addChoice("Tepper Eatery", "tep")
    .addChoice("Rooted", "rot")
    .addChoice("Schatz", "sch")
    .addChoice("Tahini", "tah")
    .addChoice("Taste of India", "tas")
    .addChoice("Underground", "und")
    .addChoice("Urban Revolution", "urb")
    .addChoice("Wild Blue Sushi", "sus")
}

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  allowedMentions: { parse: ["users", "roles"] },
  guild_id: process.env.GUILD_ID,
});

client.login(process.env.BOT_TOKEN);

client.on("messageCreate", (msg) => {
  if (msg.content === "hey") {
    msg.reply("hi there");
  } else if (msg.content === "u good bro") {
    msg.channel.send("nah");
  } else if (msg.content === "rtn is epic") {
    msg.react("❤️");
  } else if (msg.content === "ruthie is the best") {
    msg.channel.send("yes i agree");
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "buy") {
    const place = interaction.options.getString("food-destination");
    const placeName = interaction.options.get("food-destination").options;
    const count = interaction.options.getInteger("num-blocks");
    const price = interaction.options.getInteger("price-per-block");
    const userId = interaction.user.id;
    const message = respond(userId, place, placeName, count, price);
    await interaction.reply(message);
  }
});
