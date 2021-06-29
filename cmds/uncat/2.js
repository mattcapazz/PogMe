module.exports = {
  aliases: ["two"],
  description: "two",
  name: "2",
  run: async (client, msg) => {
    return msg.channel.send("2");
  },
};
