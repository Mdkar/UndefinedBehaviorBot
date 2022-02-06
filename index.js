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
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
  ],
  allowedMentions: { parse: ["users", "roles"] },
  guild_id: process.env.GUILD_ID,
  partials: ["CHANNEL"],
});

const orderCompleted = [];
const ratingBuyer = [];
const ratingSeller = [];

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
  const userId = message.content.substring(3, 21);
  if (userId !== user.id) {
    return;
  }
  if (emoji.name === "✅") {
    console.log("foo");
    user.send(
      "Your order has been completed!\nWho did you buy a block from? Please enter their discord username."
    );
    orderCompleted.push(user.id);
    await message.delete();
  } else if (emoji.name === "❌") {
    console.log("bar");
    await message.delete();
  }
});

client.on("messageCreate", (msg) => {
  console.log(msg.content);
  if (msg.channel.type == "DM") {
    let i = orderCompleted.indexOf(msg.author.id);
    if (i > -1) {
      const seller = client.users.cache.find(
        (user) => user.username == msg.content
      );
      if (seller === undefined) {
        msg.author.send("There is no user with that name! Try again!");
      } else {
        orderCompleted.splice(i, 1);
        msg.author.send("Please rate your seller on a scale from 1-5.");
        ratingSeller.push({
          buyer: msg.author.id,
          seller: seller.id,
        });
        seller.send(
          msg.author.username +
            " recently bought a block from you.\nPlease give them a rating from 1-5."
        );
        ratingBuyer.push({
          seller: seller.id,
          buyer: msg.author.id,
        });
      }
    }
    i = ratingBuyer.findIndex((info) => info.seller === msg.author.id);
    if (i > -1) {
      ratingBuyer.splice(i, 1);
      const rating = parseInt(msg.content, 10);
      if (rating === NaN || rating < 1 || rating > 5) {
        msg.author.send("Invalid Rating! Try again!");
      } else {
        console.log("Mihir sends the rating to the database!");
      }
    }
    i = ratingSeller.findIndex((info) => info.buyer === msg.author.id);
    if (i > -1) {
      ratingSeller.splice(i, 1);
      const rating = parseInt(msg.content, 10);
      if (rating === NaN || rating < 1 || rating > 5) {
        msg.author.send("Invalid Rating! Try again!");
      } else {
        console.log("Mihir sends the rating to the database!");
      }
    }
  }
});
