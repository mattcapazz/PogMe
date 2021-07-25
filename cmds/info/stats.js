const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  name: "stats",
  run: async (client, msg) => {
    //weeks = Math.floor(totalSeconds / 604800)
    let totalSeconds = client.uptime / 1000,
      days = Math.floor(totalSeconds / 86400),
      hours = Math.floor(totalSeconds / 3600);

    totalSeconds %= 3600;

    let minutes = Math.floor(totalSeconds / 60),
      seconds = totalSeconds % 60,
      uptime = "";

    days == 1 ? (uptime += days + " day, ") : (uptime += days + " days, ");
    hours == 1 ? (uptime += hours + " hour, ") : (uptime += hours + " hrs, ");
    minutes == 1
      ? (uptime += minutes + " min, ")
      : (uptime += minutes + " mins, ");
    Math.round(seconds) == 1
      ? (uptime += Math.round(seconds) + " sec")
      : (uptime += Math.round(seconds) + " secs");

    embed = new MessageEmbed()
      .addField(
        "Memory Usage",
        `${
          Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
        } MB`,
        true
      )
      .addField("Uptime", uptime, true)
      .setColor(colorCode(msg));

    return msg.channel.send(embed);
  },
};
