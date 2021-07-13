const { createGuild } = require("../../funcs.js");

module.exports = {
  aliases: ["wm"],
  name: "welcomemessage",
  run: async (client, msg, args) => {
    if (msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')) {
      const db = require("../../index").db;
      let id = msg.guild.id;
      createGuild(id);

      db.run(`UPDATE server SET wm = ? WHERE id = ?`, args.join(' '), id);
      return msg.react("<:dbCheck:862198124348047370>");
    } else return msg.channel.send("No permissions. :x:");
  },
};