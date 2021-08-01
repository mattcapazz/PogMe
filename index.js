const config = require("./config.json");
const { debug } = require("./funcs.js");
const Discord = require("discord.js");
const client = new Discord.Client();
require("discord-buttons")(client);

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./pogMe.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) debug(err.message); // If this shows up, the database is most likely corrupted, uhhh
});

const { readdirSync } = require("fs");

/**
 * Global vars
 */
client.aliases = new Discord.Collection();
/**
 * catg. Name,
 * .cfg File,
 * .js Cmds
 */
(client.categories = readdirSync("./cmds/")), [], [];
client.cmds = new Discord.Collection();
client.hex = "ABCDEF0123456789";
client.prefixes = [
  "pog ",
  "p! ",
  "p!",
  "<@700428283443019846> ",
  "<@!700428283443019846> ",
];

require("./cmds")(client);
require("./events")(client);

console.log(client.categories);

client.login(config.token);
module.exports = { client, db };
