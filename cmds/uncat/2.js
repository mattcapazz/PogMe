const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  aliases: ["two"],
  desc: `two.`,
  name: "2",
  run: async (client, msg) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setStyle("PRIMARY").setLabel("2").setCustomId("yes")
    );

    return msg.channel.send({ content: "_ _", components: [row] });
  },
};
