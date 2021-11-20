const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: ["uptime"],
  name: "stats",
  run: async (client, msg) => {
    let t = client.uptime / 1000,
      d = Math.floor(t / 86400),
      h = Math.floor(t / 3600);

    t %= 3600;

    let m = Math.floor(t / 60),
      uptime = "";

    if (d) uptime += `${d}d, `;
    if (h) uptime += `${h}h`;
    if (m) uptime += `${m}m`;
    uptime += `${Math.round(t % 60)}s`;

    embed = new MessageEmbed()
      .addField(
        "Mem. Usage",
        "```" +
          Math.round((process.memoryUsage().heapUsed / 1048576) * 100) / 100 +
          " MB```",
        true
      )
      .addField("Uptime", "```" + uptime + "```", true)
      .setColor(colorCode(msg));

    return msg.channel.send({ embeds: [embed] });
  },
};
