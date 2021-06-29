module.exports = (client) => {
  const { debug } = require("../funcs.js");
  debug(`Logged in: "${client.user.tag}".`);

  let prefix = client.prefixes[2].replace(" ", "");

  let arrStatus = [
    `${prefix}help | pogme.xyz | v0.1.1`,
    `${client.cmds.size} commands & ${client.aliases.size} aliases!`,
    `${client.guilds.cache.size} servers and ${client.users.cache.size} users | "${prefix}invite"`,
  ];

  client.user.setStatus("idle");

  setInterval(function () {
    client.user.setActivity(
      `${arrStatus[(Math.random() * arrStatus.length) | 0]}`,
      {
        type: "LISTENING",
      }
    );
  }, 30000);
};
