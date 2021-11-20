const { MessageEmbed, MessageButton } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  aliases: [
    "halloween scoreboard",
    "halloween sb",
    "h scoreboard",
    "h sb",
    "halloween lb",
    "h leaderboard",
    "h lb",
  ],
  desc: "Displays the scores of how your server members are performing.",
  name: "halloween leaderboard",
  run: async (client, msg, args) => {
    const { author, channel, guild } = msg;

    const backButton = new MessageButton({
      style: "SECONDARY",
      label: "Back",
      emoji: "⬅️",
      customId: "back",
    });
    const forwardButton = new MessageButton({
      style: "SECONDARY",
      label: "Forward",
      emoji: "➡️",
      customId: "null",
    });

    const db = require("../../index").db;
    db.all(
      "SELECT iduser, halloweenInv, halloweenUnix FROM serverUser WHERE idServer = ?",
      msg.guild.id,
      async (err, row) => {
        if (err) throw err;

        let table =
          "```md\nRank. | Items | User\n===================================\n";

        row.sort(function (a, b) {
          let pA, pB;

          if (a.halloweenInv) pA = a.halloweenInv.toString().split(",").length;
          if (b.halloweenInv) pB = b.halloweenInv.toString().split(",").length;

          if (a.halloweenUnix == null || a.halloweenUnix < b.halloweenUnix)
            pA++;
          else if (b.halloweenUnix == null || b.halloweenUnix < a.halloweenUnix)
            pB++;
          return pB - pA;
        });
        console.log(row);

        for (i = 0; i < row.length; i++) {
          let user = await client.users.fetch(row[i].idUser),
            arr;

          if (row[i].halloweenInv)
            arr = row[i].halloweenInv.toString().split(",");
          else continue;

          user.id == author.id
            ? (user = `You (${user.tag})`)
            : (user = user.tag);

          table += `${("    " + (i + 1)).slice(-4)}. |${(
            "      " + arr.length
          ).slice(-6)} | ${user}\n`; //User: ${ user.tag }\tCaught Last Item @: ${ unix } \tInventory: ${ inv }
        }
        table += "\n```";

        let embed = new MessageEmbed()
          .setColor(colorCode(msg))
          .setTitle(`🎃 Scoreboard | ${guild.name} 👻`)
          .setDescription(table);

        channel.send({ embeds: [embed] });
      }
    );

    /*
const guilds = [...client.guilds.cache.values()]
    // Put the following code wherever you want to send the embed pages:


    const generateEmbed = async start => {
      const current = guilds.slice(start, start + 10)

      // You can of course customise this embed however you want
      return new MessageEmbed({
        title: `🎃 Scoreboard | ${ guild.name } 👻`,
        fields: await Promise.all(
          current.map(async guild => ({
            name: guild.name,
            value: `** ID:** ${ guild.id } \n ** Owner:** ${ (await guild.fetchOwner()).user.tag } `
          }))
        )
      })
    }

    // Send the embed with the first 10 guilds
    const canFitOnOnePage = guilds.length <= 10
    const embedMessage = await channel.send({
      embeds: [await generateEmbed(0)],
      components: canFitOnOnePage
        ? []
        : [new MessageActionRow({ components: [forwardButton] })]
    })
    // Exit if there is only one page of guilds (no need for all of this)
    if (canFitOnOnePage) return

    // Collect button interactions (when a user clicks a button),
    // but only when the button as clicked by the original message author
    const collector = embedMessage.createMessageComponentCollector({
      filter: ({ user }) => user.id === author.id
    })

    let currentIndex = 0
    collector.on('collect', async interaction => {
      // Increase/decrease index
      interaction.customId === 'back' ? (currentIndex -= 10) : (currentIndex += 10)
      // Respond to interaction by updating message with new embed
      await interaction.update({
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [
              // back button if it isn't the start
              ...(currentIndex ? [backButton] : []),
              // forward button if it isn't the end
              ...(currentIndex + 10 < guilds.length ? [forwardButton] : [])
            ]
          })
        ]
      })
  })*/
  },
};
