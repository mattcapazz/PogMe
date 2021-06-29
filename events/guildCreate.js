module.exports = (client, guild) => {
  const { createGuild, debug } = require("../funcs.js");

  createGuild(guild.id);
  debug(`${client.user.username} joined into a new server: "${guild.name}"!`);
};
