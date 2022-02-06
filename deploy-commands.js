require("dotenv").config();
const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const token = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Pings the channel that someone wants a block")
    .addStringOption((option) =>
      option
        .setName("food-destination")
        .setDescription("The restaurant where they want to go")
        .setRequired(true)
        .addChoice("Au Bon Pain", "abp")
        .addChoice("Back Bar Grill", "bbb")
        .addChoice("Beefsteak", "bs")
        .addChoice("Egg Shoppe", "eg")
        .addChoice("Cucina", "cc")
        .addChoice("Entropy", "ent")
        .addChoice("Exchange", "ecg")
        .addChoice("El Gallo de Oro", "gal")
        .addChoice("Grano", "gno")
        .addChoice("HunanExpress", "hun")
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
    )
    .addIntegerOption((option) =>
      option
        .setName("num-blocks")
        .setDescription("The number of blocks")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("price-per-block")
        .setDescription("The price per block")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
