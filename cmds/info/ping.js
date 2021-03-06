const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: ["delay", "lag", "lagg", "latency", "pong", "🏓"],
  desc: "Check my ping to see if there's an issue on how long I'm taking to reply.",
  name: "ping",
  run: async (client, msg) => {
    const diffP = ["Ping", "Pong"];
    const embed = new MessageEmbed()
      .addField("Client Ping", `Pinging...`)
      .addField("DiscordAPI", `Pinging...`)
      .setColor(colorCode(msg))
      .setFooter(
        `Client Ping isn't your ping. It's from ${client.user.username}'s host!`
      );
    const m = await msg.channel.send({
      content: `Pinging...`,
      embeds: [embed],
    });
    embed.fields = [];
    embed.addField(
      "Client Ping",
      "```" + (m.createdTimestamp - msg.createdTimestamp) + " ms```",
      true
    );
    embed.addField("DiscordAPI", "```" + `${client.ws.ping} ms` + "```", true);
    return m.edit({
      content: `🏓 **${diffP[(Math.random() * diffP.length) | 0]}**!`,
      embeds: [embed],
    });
  },
};
