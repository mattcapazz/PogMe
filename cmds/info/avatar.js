const { MessageEmbed } = require("discord.js");
const { colorCode, executor } = require("../../funcs.js");

module.exports = {
  aliases: ["a", "av", "icon", "pfp", "usericon"],
  desc: `Get any user's avatar. If they're not in the server, you can tag them or use their user ID.`,
  name: "avatar",
  usage: "(user)",
  run: async (client, msg, args) => {
    let embed;

    let user = args[0]
      ? await client.users
        .fetch(args[0].replace(new RegExp(/\W/, "g"), ""))
        .catch(() =>
          msg.channel.send(
            `Unknown User, I couldn't find any user by name or ID ${args[0]}. Maybe try again in a different way.`
          )
        )
      : msg.author;
    if (user.tag) {
      //If it's a user
      const exec = executor(user, msg.author);
      embed = new MessageEmbed()
        .setAuthor(`${user.tag}'s\nProfile Picture`, user.avatarURL())
        .setColor(colorCode(msg))
        .setDescription(
          `**Image Links**: [JPG](${user.avatarURL({
            format: "jpg",
            size: 2048,
          })}) | ` +
          `[PNG](${user.avatarURL({ format: "png", size: 2048 })}) | ` +
          `[WEBP](${user.avatarURL({ format: "webp", size: 2048 })})`
        )
        .setFooter(exec[0], exec[1])
        .setImage(
          user.avatarURL({
            format: "png",
            size: 2048,
          })
        );

      //If animated pfp
      if (user.avatar.startsWith("a_")) {
        embed.setAuthor(
          `${user.tag}'s\nProfile Picture`,
          user.avatarURL({
            format: "gif",
          })
        );
        embed.setDescription(
          `${embed.description} | [GIF](${user.avatarURL({
            format: "gif",
            size: 2048,
          })})`
        );
        embed.setImage(
          user.avatarURL({
            format: "gif",
            size: 2048,
          })
        );
      }

      return msg.channel.send(embed);
    }
  },
};
