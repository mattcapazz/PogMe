const axios = require("axios").default;
const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: ["meaning", "urban"],
  description: "Look for an accurate definition of a term on UrbanDictionary.",
  name: "define",
  usage: "[term]",
  run: async (client, msg, args) => {
    let options = {
      method: "GET",
      url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
      params: { term: args.join(" ") },
      headers: {
        "x-rapidapi-key": "e3b5c8d9a9mshb833af8a48baa68p13d067jsn0523e7791612",
        "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        let word = response.data.list[0];

        const embed = new MessageEmbed()
          .setTitle(word.word)
          .setURL(word.permalink)
          .setColor(colorCode(msg))
          .setDescription(word.definition.replace(/[\[\]']+/g, ""))
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/858400861990158376/859122519139549224/urban.png"
          )
          .addField(
            "Example",
            `${word.example.replace(/[\[\]']+/g, "")}\n\n*(Defined by: **${
              word.author
            }**)*`
          )
          .addField(":thumbsup: Thumbs up", word.thumbs_up, true)
          .addField(":thumbsdown: Thumbs down", word.thumbs_down, true)
          .addField(
            ":calendar_spiral: Written on",
            String(word.written_on).split("T")[0],
            true
          );

        return msg.reply(embed);
      })
      .catch(function (error) {
        return msg.reply("no");
      });
  },
};
