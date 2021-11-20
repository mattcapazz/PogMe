require("dotenv").config();
const { debug } = require("./funcs.js");
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
  ],
});

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./pogMe.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) debug(err.message); // If this shows up, the database is most likely corrupted, uhhh..
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

client.matrix = {
  1: [
    "*Insane* Icey",
    "Poisonous Beer",
    "Bloody Skirt",
    "Ice Shard",
    "897863792766103572",
  ],
  2: [
    "*Spooky* Sand",
    "Crimson Grain of Sand",
    "Huge Honker",
    "Disturbing Meme",
    "897863872218796082",
  ],
  3: [
    "*Terrible* Trash",
    "Rotten Banana Peel",
    "Shrivelled Limb",
    "Xbox",
    "897863911875960892",
  ],
  4: [
    "Matt *the Maniac*",
    "Bloody Scarf",
    "Killer Knife",
    "*Matt’s* Sanity",
    "897863955052134540",
  ],
  5: ["Ghost Cube", "Frozen Fabric", "Bony Arm", "Lucas", "897863995338399744"],
  6: [
    "A Harmless Spider *(lie)*",
    "Bloody Web",
    "Spider Fang",
    "Mint Oreo",
    "897864055560220732",
  ],
  //7: ["Tentable Qub", "*Sus*picious Portion of Nothing", "Uncommon Nothing", "Small Gooey Rubix Cube *(ew)*", "897864092201664512"],
  7: [
    "ŒXîł",
    "Eye Orb",
    "Claw of *ŒXîł*",
    "Mysterious Goo",
    "897864150271815730",
  ],
  8: [
    "Sickly Feline",
    "Bent Whisker",
    "Strange Acid",
    "Toxic Paw",
    "897864193728970812",
  ],
  9: [
    "Sea Crawler",
    "Tentacle",
    "Rotten Crab",
    "Blood Ink",
    "897864229942591558",
  ],
  10: [
    "Handsome Raven",
    "*Raven’s* Eye",
    "Bloody Beak",
    "Essence of Death",
    "897864262125514802",
  ],
  //12: ["Chare *the Butter Knife Holder*", "Butter Knife", "Spoopy SOUL", "Chocolate Crumb", "897926644684165170"],
  //13: ["Shadow the Donut Thrower", "Hedgehog Quil", "Donut", "Light Speed", "897926730168291338"]
  11: [
    "Dead Ted",
    "Button Eye",
    "Agile Needle",
    "Blood of *Ted*",
    "899022801460158524",
  ],
  12: [
    "Dark Fae",
    "Fairy Dust",
    "Cursed Blade",
    "*Fae* Drugs",
    "899023013780021258",
  ],
  13: [
    "Two-headed Snake",
    "*Snake* Skin",
    "Undigested Rat",
    "*Snake* Vemon",
    "899023248598138971",
  ],
  14: [
    "Buggy *the Wholesome Killer*",
    "P̶̛̯̤͉̼̮̰̰̊͗̐͑͆̔͗̈̌͒̇͜͝l̵͉͎̞̼͔̘͇̫͓͈̳͛͆̆͝a̵̪͖̯̾̉͑̕c̴̻̐̃̆͊̈́̊̾̀̆́͘͘͝e̵̫̬̪̦̦̣̟̠̓͐̃͗́͗̋́̊͜h̶͎͇̳̗̒̃̈́̒͂͋̄̌̏͐̚͘͘ở̸̜̰͚̘̭̤̤̣̍̄̃͂̾̃͛̋̿͘͜͝l̶̮͓̲̻͆̈́̋̚ḑ̷̟̼̳̰̮̖͇̪̯̺͈͇̰͌́͆̇̾͌ͅȩ̵̧̳͚͖̺͖̀̒͑́̾̾̃̆̈́̔͝͝r̸̨̮̻̼͑̄̋͆͛͂̃̃̈̒̈́̍͘͘͠",
    "P̷̡̡̤̥̮͕͕͓̦̼̏̌͒̿̾́̉́͛̓̃̅̉͂͘͠͠ļ̷̨̢̣̯̤̻̭͔̔̈́̅̋̋͠ä̸̧͎̣̲̬̘̟̰̗̫̯̝̰̻͈́̿͊̅ͅͅc̵̤̗͙̀̒̃̊͠e̵̮̦͚̪͖͍͉̬̥͋͛͒̾̈́̿͆́͒̔͒̑̓͒͘͝͝h̴̨̲̫͖̔̉͗͑̀͗̔̄̑̓̈̾͌͒͝ơ̵̩̟̠̙̍̉̈̓̀̽̾̒̈́͛͑̃̚̕̕͜͜͝l̴̢̢̬͓̻͍̖̟̩̻͚̩̞̠̠̆d̴̡̡̜̩̬̰̦̗̰̭̼̔̏̑̋͆͝e̸̢̛͕͂̍̈́̆̿̌̅̍r̸̛̞̖̞̲͇̹̞̆̃̃̉̃̈́̃͂͌̚̕̚̚̕͜",
    "P̴̨̹̗͚̮̙̺̰̾̈͜ĺ̶̡͔̯̠̝̤͕͙͕͕̯̭̞̦̰͛̇͜a̷͔̮̻̠̭̲̖͒̀̓c̵̢̢̛̛͚͚̳͈̹̰̲͔̝̘̰͇̺̰͚̎̽̅̐́͛̽̓̽̉̍̊͠e̸̢̛͎̣̖̬͛̑͐́̄͗̆̽̔͌̀̏̚͠͝ḩ̴̜̫̫̩̦̓̒̈́̊͂͗͒̈́̈́͆o̴̤̱̾̄͋l̴̢̨͖̥̦̻̤̖̻͎̬͚̰͋d̶̜̟͙͂̏e̶͉̰͛̍͂̒̐͜͝r̵͔̪̹̭̫̩̅̈̿̔ͅͅ",
    "904107004400902224",
  ],
};
client.sv = [];

require("./cmds")(client);
require("./events")(client);

//console.log(client.categories);
client.login(process.env.token);

module.exports = { client, db };
