module.exports = {
  aliases: ["testwelcome"],
  desc: "Test out your welcome messages and diagnose any potential problems on the spot, so you don't have to keep joining with alts to test.",
  name: "testjoin",
  run: async (client, msg) => {
    if (msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) {
      client.emit("guildMemberAdd", msg.member);
      return msg.react("<:checkmark:862198124395495434>");
    } else return msg.channel.send("No permissions. :x:");
  },
};
