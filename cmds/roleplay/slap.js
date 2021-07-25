const superagent = require("superagent");
const { MessageEmbed } = require("discord.js");
const { colorCode, createUser } = require("../../funcs.js");

module.exports = {
  aliases: ["punch"],
  desc: `Slap someone in the face.`,
  name: "punch",
  usage: "(user)",
  run: async (client, msg, args) => {
    createUser(msg.member.id); // Create user

    const { body } = await superagent.get("https://nekos.life/api/slap");
    let embed = new MessageEmbed()
      .setColor(colorCode(msg))
      .setImage(body.url)
      .setTitle(`${msg.member.displayName} slaps themself.`);

    if (msg.mentions.members.size) {
      createUser(msg.mentions.members.first().id); // Create mentioned user

      if (msg.mentions.members.first().id != msg.member.id) {
        embed.setTitle(
          `${msg.member.displayName} slaps ${
            msg.mentions.members.first().displayName
          }.`
        );
      }
    }

    return msg.channel.send({ embed });
  },
};
