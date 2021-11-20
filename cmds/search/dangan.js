const { MessageEmbed } = require("discord.js");
const { image_search } = require("duckduckgo-images-api");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: ["dangan"],
  name: "danganronpa",
  run: async (_, msg, args) => {
    let arg = args.slice(0).join(" ");
    let q = `danganronpa ${arg}`;
    if (args.length == 1 && Math.random() <= 0.5) q += " fanart";

    image_search({
      query: q,
      moderate: true,
      iterations: 1,
    }).then((r) => {
      console.log(r);
      let embed = new MessageEmbed().setColor(colorCode(msg));

      if (!r[0])
        embed.setDescription(
          ":warning: Server is busy, or you're being rate-limited. Try using the command again later."
        );
      else {
        let rnd = Math.floor(Math.random() * r.length);

        let i = 0;
        while (
          !arg.includes("cosplay") &&
          r[rnd].title.toLowerCase().includes("cosplay") &&
          i != 5
        ) {
          console.log(r[rnd]);
          rnd = Math.floor(Math.random() * r.length);
          i++;
        }

        let url = /^(http|https):\/\/(www.|)(\w+)/.exec(r[rnd].url);

        embed.setTitle(r[rnd].title);
        embed.setURL(r[rnd].url);
        embed.setImage(r[rnd].image);
        embed.setFooter(
          url[3].charAt(0).toUpperCase() + url[3].slice(1),
          `https://www.google.com/s2/favicons?domain_url=${url.input}`
        );
      }

      return msg.channel.send({ embeds: [embed] });
    });
  },
};
