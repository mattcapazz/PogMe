const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  desc: `**Tara ♡**: “Only the coolest people use this” — 08/06/21`,
  name: "9",
  run: async (client, msg) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setStyle("DANGER").setLabel("9").setCustomId("yes")
    );

    return msg.channel.send({ content: "_ _", components: [row] });
  },
};
