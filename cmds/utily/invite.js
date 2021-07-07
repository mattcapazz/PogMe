const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: ["botinvite"],
  description:
    "Get my invite link so you can add me to other servers or tell your friends about me!",
  name: "invite",
  run: async (client, msg) => {
    const embed = new MessageEmbed()
      .setTitle("Here's the link to invite me!")
      .setColor(colorCode(msg))
      .setDescription(
        "[https://pogme.xyz/invite](https://discord.com/api/oauth2/authorize?client_id=700428283443019846&permissions=1208347734&redirect_uri=https%3A%2F%2Fdiscord.com%2Finvite%2FvKWe7ymUJq&scope=bot)\n" +
        "I hope I may be essential to you or someone on your server!"
      );
    msg.channel.send(embed);
  },
};
