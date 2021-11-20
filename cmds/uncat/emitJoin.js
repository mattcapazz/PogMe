module.exports = {
  name: "emitjoin",
  run: async (client, msg) => {
    client.emit("guildCreate", msg.guild);
  },
};
