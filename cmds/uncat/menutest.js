const { MessageMenu, MessageMenuOption } = require("discord-buttons");

module.exports = {
  aliases: ["mt"],
  name: "menuTest",
  run: async (client, msg) => {
    let option = new MessageMenuOption()
      .setLabel('Your Label')
      .setEmoji('🍔')
      .setValue('menuid')
      .setDescription('Custom Description!')

    let select = new MessageMenu()
      .setID('customid')
      .setPlaceholder('Click me! :D')
      .setMaxValues(1)
      .setMinValues(1)
      .addOption(option)

    return msg.channel.send('Text with menu!', select);
  },
};
