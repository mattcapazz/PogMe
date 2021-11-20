const { createGuild } = require("../../funcs.js");

module.exports = {
  aliases: ["welcomelocation", "wc"],
  name: "welcomechannel",
  run: async (client, msg, args) => {
    if (msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) {
      const db = require("../../index").db;
      let id = msg.guild.id;
      createGuild(id);

      db.run(`UPDATE server SET wc = ? WHERE id = ?`, args[0], id);
      return msg.react("<:dbCheck:862198124348047370>");
    } else return msg.channel.send("No permissions. :x:");
  },
};
