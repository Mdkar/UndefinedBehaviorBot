require("dotenv").config();
const { respond } = require("./respond.js");
const channelId = "939752273712672798";

const placeNameMap = {
  abp: "Au Bon Pain",
  bbb: "Back Bar Grill",
  bs: "Beefsteak",
  eg: "The Egg Shoppe",
  cc: "Cucina",
  ent: "Entropy",
  ecg: "The Exchange",
  gal: "El Gallo de Oro",
  gno: "Grano",
  hun: "Hunan Express",
  ink: "Innovation Kitchen",
  lap: "La Prima",
  nrs: "Nourish",
  tep: "Tepper Eatery",
  rot: "Rooted",
  sch: "Schatz",
  tah: "Tahini",
  tas: "Taste of India",
  und: "The Underground",
  urb: "Urban Revolution",
  sus: "Wild Blue Sushi",
};

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "USER", "REACTION", "MESSAGE"],
  allowedMentions: { parse: ["users", "roles"] },
  guild_id: process.env.GUILD_ID,
});

client.login(process.env.BOT_TOKEN);

client.on("messageCreate", (msg) => {
  if (msg.content === "hey") {
    msg.reply("hi there");
  } else if (msg.content === "u good bro") {
    msg.channel.send("nah");
  } else if (msg.content === "tartanhacks is epic") {
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
    const placeName = placeNameMap[place];
    const count = interaction.options.getInteger("num-blocks");
    const price = interaction.options.getInteger("price-per-block");
    const userId = interaction.user.id;
    const message = respond(userId, place, placeName, count, price);
    const blockMarket = client.channels.cache.get(channelId);
    const msg = await blockMarket.send(message);
    await msg.react("❌");
    await msg.react("✅");
    await interaction.reply(
      "Your order was placed successfully. React to your order in <#" +
        channelId +
        "> with :x: to cancel the order and :white_check_mark: if order has been fulfilled."
    );
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  const emoji = reaction.emoji;
  const message = reaction.message;
  console.log(message);
  if (reaction === "✅") {
    console.log("foo");
  }
  else if (reaction === "❌") {
    console.log("bar");
  }
})