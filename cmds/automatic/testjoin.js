module.exports = {
  name: "testjoin",
  run: async (client, msg) => {
    client.emit('guildMemberAdd', msg.member);
    msg.react("<:checkmark:862198124395495434>");
  },
};