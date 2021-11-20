const ms = require("ms");
const { createServerUser } = require("../../funcs.js");

module.exports = {
  aliases: ["dc"],
  desc:
    "Disconnects you automatically of any voice channel from the server, if allowed.\n" +
    "You may also supply a user (**Requires `Move Members` permission**), a chosen time,\nand lastly a reason.",
  name: "disconnect",
  usage: `(@user) (time) (reason)`,
  run: async (client, msg, args) => {
    if (args.length) {
      // user
      if (msg.mentions.members.size) {
        // time
        if (args[1]) {
          let idServer = msg.guild.id;
          let idUser = msg.mentions.members.first().id;

          let secs = args[1];
          if (isNaN(args[1])) secs = ms(args[1], { long: true }) / 1000;

          const db = require("../../index").db;
          createServerUser(idServer, idUser).then(() => {
            db.run(
              "UPDATE serverUser SET dcTime = ? WHERE idServer = ? AND idUser = ?",
              [Number(((+new Date() / 1e3) | 0) + secs), idServer, idUser]
            );
          });

          // reason
          if (args[2]) {
            //msg.channel.send(`**Reason**: ${args.slice(2).join(" ")}`);
          }
        }
      }
    } else msg.member.voice.kick();
  },
};
