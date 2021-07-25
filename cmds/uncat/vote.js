const { MessageActionRow, MessageButton } = require("discord-buttons");

module.exports = {
  name: "vote",
  run: async (client, msg) => {
    let btn1 = new MessageButton()
      .setEmoji("867677739766906901")
      .setLabel("Top.gg")
      .setStyle("url")
      .setURL("https://top.gg/");

    let btn2 = new MessageButton()
      .setEmoji("867677739732303872")
      .setLabel("Bots on Discord")
      .setStyle("url")
      .setURL("https://bots.ondiscord.xyz/");

    let btn3 = new MessageButton()
      .setEmoji("867677739686952970")
      .setLabel("Discord Bot List")
      .setStyle("url")
      .setURL("https://discordbotlist.com/");

    let btn4 = new MessageButton()
      .setEmoji("867677739720114176")
      .setLabel("Disforge")
      .setStyle("url")
      .setURL("https://disforge.com/bots");

    let a = new MessageActionRow().addComponents(btn1),
      b = new MessageActionRow().addComponents(btn2),
      c = new MessageActionRow().addComponents(btn3),
      d = new MessageActionRow().addComponents(btn4);

    let btns = { components: [a, b, c, d] };

    return msg.channel.send("Voting platforms!", btns);
  },
};
