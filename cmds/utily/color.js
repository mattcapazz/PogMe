const { colorCode } = require("../../funcs.js");
const Canvas = require("canvas");
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  aliases: ["colour"],
  desc: "I'll show a preview of the colour if supplied. Otherwise, I'll show you a random one, useful to check out colours for your embeds.",
  name: "color",
  usage: "(#hex)",
  run: async (client, msg, args) => {
    let code = "#";

    if (args[0]) {
      if (/^[0-9a-fA-F]{6}$/.test(args[0])) code += args[0];
      else if (
        args[0].startsWith("#") &&
        /^[0-9a-fA-F]{6}$/.test(args[0].substring(1))
      )
        code = args[0];
      else {
        let otherEmbed = new MessageEmbed()
          .setColor(colorCode(msg))
          .setDescription(
            `**Sorry ${msg.member.displayName}**, I couldn't figure out what colour that is.` +
              "\nPlease try repeating the command with a ***valid #HEX***\n***colour code***."
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/858400861990158376/860069998571421726/senkoWorried.png"
          )
          .setTitle("Syntax Error");

        return msg.channel.send({ embeds: [otherEmbed] });
      }
    } else
      for (let i = 0; i < 6; i++)
        code += client.hex.charAt(
          Math.floor(Math.random() * client.hex.length)
        );

    const canvas = Canvas.createCanvas(200, 200);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = code;
    ctx.fillRect(0, 0, 200, 200);

    const attach = new MessageAttachment(canvas.toBuffer(), "color.jpg");

    const embed = new MessageEmbed()
      .setColor(code)
      .setImage("attachment://color.jpg")
      .setTitle(`Preview of the color ${code.toUpperCase()}`);

    return msg.channel.send({ embeds: [embed], files: [attach] });
  },
};
