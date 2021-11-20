const axios = require("axios").default;
require("dotenv").config();

const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: ["meaning", "urban"],
  desc: "Look for an accurate definition of a term on UrbanDictionary.",
  name: "define",
  usage: "[term]",
  run: async (client, msg, args) => {
    let options = {
      method: "GET",
      url: "https://mashape-community-urban-dictionary.p.rapidapi.com/define",
      params: { term: args.join(" ") },
      headers: {
        "x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
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
          .addField(":thumbsup: Thumbs up", word.thumbs_up.toString(), true)
          .addField(
            ":thumbsdown: Thumbs down",
            word.thumbs_down.toString(),
            true
          )
          .addField(
            ":calendar_spiral: Written on",
            String(word.written_on).split("T")[0].toString(),
            true
          );

        return msg.channel.send({ embeds: [embed] });
      })
      .catch(function (error) {
        return msg.reply("no");
      });
  },
};
