const { createServerUser } = require("../funcs.js");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, i) => {
  console.log(i);
  let { customId, guildId, user, message } = i;
  let id = i.customId;
  if (customId.startsWith("spoopy:")) {
    let item = customId.replace("spoopy:", "").replace(/-.*$/, ""),
      name = customId.replace(/^.*-/, "").replace(/;.*/, ""),
      rarity = customId.replace(/.*;/, "").replace(/=.*/, ""),
      itemID = customId.replace(/.*=/, "");

    if (!isNaN(item)) {
      row = new MessageActionRow();
      for (x = 0; x < message.components[0].components.length; x++) {
        // console.log(x, item, message.components[0].components[x]);
        if (x == item)
          row.addComponents(
            new MessageButton()
              .setCustomId(`null${x}`)
              .setStyle("SECONDARY")
              .setEmoji("🕸️")
              .setDisabled()
          );
        else row.addComponents(message.components[0].components[x]);
      }
      await i.update({
        components: [row],
      });
    } else {
      let txt = "";
      if (rarity == 1)
        txt =
          "This item is common. There's nothing special about it. It's been added to your inventory";
      else if (rarity == 2)
        txt =
          "This item is uncommon. You wonder where they got it... It has been added to your inventory.";
      else
        txt =
          "This item is rare. You feel special. It has been added to your inventory.";

      const db = require("../index").db;
      createServerUser(i.guildId, i.user.id).then(() => {
        db.get(
          `SELECT halloweenInv FROM serverUser WHERE idServer = ? AND idUser = ?`,
          i.guildId,
          i.user.id,
          (err, row) => {
            let arr = [];
            if (row.halloweenInv) arr = row.halloweenInv.toString().split(",");
            if (arr.includes(itemID)) txt = "You already had this item!";
            else {
              arr.push(itemID);
              db.run(
                `UPDATE serverUser SET halloweenInv = ?, halloweenUnix = ? WHERE idServer = ? AND idUser = ?`,
                arr.toString(),
                (+new Date() / 1e3) | 0,
                i.guildId,
                i.user.id
              );
            }

            i.update({
              components: [],
              embeds: [
                message.embeds[0]
                  .setTitle("Happy Halloween! 🎃")
                  .setDescription(
                    `As a thank you for your kindness, **${name}** gave ${i.member} one **${item}**`
                  )
                  .setFooter(txt),
              ],
            });
          }
        );
      });
    }
  }
};
