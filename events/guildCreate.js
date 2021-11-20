const { MessageEmbed, Permissions } = require("discord.js");

module.exports = (client, guild, msg) => {
  const { createGuild, debug, colorCode } = require("../funcs.js");

  createGuild(guild.id);
  debug(`${client.user.username} joined into a new server: "${guild.name}"!`);

  // Func. taken from Code Examples @ discordjs-bot-guide
  const getDefaultChannel = (guild) => {
    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.cache.find((channel) =>
      channel.name.includes("general")
    );
    if (generalChannel) return generalChannel;
    /* Now we get into the heavy stuff: first channel in order where the bot can speak
    hold on to your hats! */
    return guild.channels.cache
      .filter(
        (c) =>
          c.type === "GUILD_TEXT" &&
          guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)
      )
      .first();
  };

  let embed = new MessageEmbed()
    .setTitle(`Halloween is here!!1`)
    .setDescription(
      `I want to help bring a trick-or-treat experience to everyone. 
      Greet trick-or-treaters, collect items and become the **The Spookiest™**. 

      *I recommend hoisting the* **The Spookiest™** *role for best visibility.*  🎃

      First, start by determining which channel trick-or-treaters 
      should spawn in by using \`p!halloween enable #channel\`!
      
      Find my command list using: \`pog help\`.
      (*For Halloween specific use: \`pog help halloween\`*)`
    )
    .setColor(colorCode())
    .setFooter("Good luck and Happy Halloween everyone!")
    .setAuthor(
      `Heya ${guild.name}, I'm glad I was added here!`,
      "https://cdn.discordapp.com/emojis/896704413975068734.png?size=128"
    );
  //getDefaultChannel(guild).send({ embeds: [embed] });
};
