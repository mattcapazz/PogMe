module.exports = (client) => {
  const { debug } = require("../funcs.js");
  debug(`Logged in: "${client.user.tag}".`);

  let prefix = client.prefixes[2].replace(" ", ""), arrStatus = [
    `${prefix}help | pogme.xyz | v0.1.9`,
    `${client.cmds.size} commands & ${client.aliases.size} aliases!`,
    `${client.guilds.cache.size} servers and ${client.users.cache.size} users | "${prefix}invite"`,
  ], i = 1;

  client.user.setStatus("idle");

  setTimeout(function () {
    client.user.setActivity(
      arrStatus[0], {
      type: "LISTENING",
    });
  }, 50)

  setInterval(function () {
    client.user.setActivity(
      arrStatus[i], {
      type: "LISTENING",
    }
    );

    (i == arrStatus.length - 1)
      ? i = 0
      : i++;
  }, 30000);
};