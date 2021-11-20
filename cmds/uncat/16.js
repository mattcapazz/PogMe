const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  desc: `icey number`,
  name: "16",
  run: async (client, msg) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setStyle("SUCCESS").setLabel("16").setCustomId("yes")
    );

    return msg.channel.send({ content: "_ _", components: [row] });
  },
};
