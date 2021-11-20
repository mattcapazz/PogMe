const { MessageEmbed } = require("discord.js");

module.exports = (client, member) => {
  const db = require("../index").db;
  db.get(
    `SELECT wc, wm FROM server WHERE id = ?`,
    member.guild.id,
    (err, row) => {
      let channel = client.guilds.cache
          .get(member.guild.id)
          .channels.cache.get(row.wc),
        wm = row.wm;

      let user = member.user;

      wm = wm.replace(/{user}/g, user); // {member}
      wm = wm.replace(
        /{user\.avatar}/g,
        user.avatarURL({
          format: "png",
          size: 2048,
        })
      );
      wm = wm.replace(/{user\.createdAt}/g, user.createdAt);
      wm = wm.replace(/{user\.discrim}/g, user.discriminator);
      wm = wm.replace(/{user\.id}/g, user.id);
      wm = wm.replace(/{user\.name}/g, user.username);
      wm = wm.replace(/{user\.tag}/g, user.tag);

      let json = JSON.parse(wm);
      let embed = json.embed;

      let discEmbed = new MessageEmbed()
        .setColor(embed.color)
        .setDescription(embed.description)
        .setFooter(embed.footer.text)
        .setImage(embed.image.url)
        .setThumbnail(embed.thumbnail.url)
        .setTitle(embed.title);

      if (embed.fields)
        for (let i = 0; i < embed.fields.length; i++)
          discEmbed.addField(
            embed.fields[i].name,
            embed.fields[i].value,
            embed.fields[i].inline
          );

      channel.send(json.content, {
        embed: discEmbed,
      });
    }
  );
};
