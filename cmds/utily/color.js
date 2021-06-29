const Canvas = require("canvas");
const { MessageAttachment, MessageEmbed } = require("discord.js");

module.exports = {
  aliases: ["colour"],
  description:
    "I'll show a preview of the colour if supplied. Otherwise, I'll show you a random one, useful to check out colours for your embeds.",
  name: "color",
  usage: "(#hex)",
  run: async (client, msg, args) => {
    let code = "#";
    console.log(args);

    if (args)
      if (/^[0-9a-fA-F]{6}$/.test(args[0])) code += args[0];
      else if (/^[0-9a-fA-F]{6}$/.test(args[0].substring(1))) code = args[0];
      else
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
      .attachFiles(attach)
      .setColor(code)
      .setImage("attachment://color.jpg")
      .setTitle(`Preview of the color ${code.toUpperCase()}`);

    msg.channel.send(embed);
  },
};
