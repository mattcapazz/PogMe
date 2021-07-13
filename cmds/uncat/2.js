const { MessageButton } = require("discord-buttons");

module.exports = {
  aliases: ["two"],
  desc: "two",
  name: "2",
  run: async (client, msg) => {
    let btn = new MessageButton()
      .setStyle('blurple')
      .setLabel('2')
      .setID('yes')

    return msg.channel.send('_ _', btn);
  },
};
