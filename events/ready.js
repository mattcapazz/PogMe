module.exports = (client) => {
  const { debug } = require("../funcs.js");
  debug(`Logged in: "${client.user.tag}".`);

  let prefix = client.prefixes[2].replace(" ", ""),
    arrStatus = [
      `${prefix}help | pogme.xyz | v0.3.6`,
      `${client.cmds.size - 7} commands & ${client.aliases.size} aliases!`,
      `${client.guilds.cache.size} servers and ${client.users.cache.size} users | "${prefix}invite"`,
    ],
    i = 1;

  client.user.setStatus("idle");

  setTimeout(function () {
    client.user.setActivity(arrStatus[0], {
      type: "LISTENING",
    });
  }, 50);

  setInterval(function () {
    client.user.setActivity(arrStatus[i], {
      type: "LISTENING",
    });

    i == arrStatus.length - 1 ? (i = 0) : i++;
  }, 30000);

  const db = require("../index").db;
  setInterval(function () {
    db.all(
      "SELECT * FROM serverUser WHERE dcTime != 0 AND dcTime < ?",
      (+new Date() / 1e3) | 0,
      (err, rows) => {
        rows.forEach((row) => {
          client.guilds.cache
            .get(row.idServer)
            .members.cache.get(row.idUser)
            .voice.disconnect();

          db.run(
            "UPDATE serverUser SET dcTime = 0 WHERE idServer = ? AND idUser = ?",
            [row.idServer, row.idUser]
          );
        });
      }
    );
  }, 1000);
};
