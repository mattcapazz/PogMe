const { colorCode, emoji, msgDelete } = require("../../funcs.js");
const { commaListsOr } = require("common-tags");
const { MessageEmbed, Permissions } = require("discord.js");

let prefix;

module.exports = {
  aliases: [
    "?",
    "command",
    "commands",
    "features",
    "howto",
    "info",
    "information",
  ],
  desc:
    "A description of this command is quite useless. *Anyways*.\n" +
    "This command shows the information of a specific command or a section.\n" +
    `If no arguments provided, I'll show a list of all sections I have.`,
  name: "help",
  usage: "(command/section)",

  run: async (client, msg, args) => {
    prefix = client.prefixes[0].replace(" ", "");
    if (args[0] == "-p") return getAll(client, msg, args[0]);
    if (args[0]) return getCMD(client, msg, args.join(" "));
    else return getAll(client, msg);
  },
};

function getAll(client, msg, args) {
  let desc;

  const embed = new MessageEmbed()
    .setColor(colorCode(msg))
    .setTitle(`${client.user.username}'s Functions`);

  desc = `To check out a command or a section type \`${prefix} help [command/section]\`.`;

  if (
    msg.channel.type.toLowerCase() == "dm" ||
    msg.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
  )
    desc +=
      `\nIf you want this command to show up in server chat instead of DMs add **-p** at the end of the command.` +
      `\n**Example**: \`${prefix.replace(
        " ",
        ""
      )} help -p\` or \`${prefix} help moderation -p\``;

  desc +=
    "\n\nFor arguments in commands:\n" +
    "`[]` means it's required\n" +
    "`()` indicates it's optional\n" +
    "**Don't include the `[]` & `()` symbols in the command!**\n\u200b";

  embed.setDescription(desc);

  let ctg = client.categories;

  for (let i = 0; i < client.categories.length; i++)
    if (ctg[i][1]) {
      ctg[i][2].length > 1 ? (cmdQnt = "commands") : (cmdQnt = "command");
      embed.addField(
        ctg[i][1].name,
        `${ctg[i][1].desc}\n**${ctg[i][2].length} ${cmdQnt}**`,
        true
      );
    }

  if (args) return msg.channel.send({ embeds: [embed] });
  if (msg.channel.type.toLowerCase().includes("text")) {
    msg.author.send({ embeds: [embed] });
    return msgDelete(
      msg,
      `**Gotcha** ${
        msg.author
      }! I've sent you a DM with my commands n' stuff. Please check your DMs! ${emoji(
        "senkoHappy"
      )}`
    );
  }
  return msg.channel.send({ embeds: [embed] });
}

function getCatg(client, msg, catg) {
  const embed = new MessageEmbed()
    .setColor(colorCode(msg))
    .setTitle(`${client.user.username}'s ${catg[1].name} Commands`)
    .setDescription(`**${catg[1].desc}**\n`);

  for (let i = 0; i < catg[2].length; i++) {
    let cmd = catg[2][i].slice(0, -3);
    embed.addField(
      `${client.prefixes[0]}${cmd}`,
      client.cmds.get(cmd).desc || "-"
    );
  }

  return msg.channel.send({ embeds: [embed] });
}

function getCMD(client, msg, input) {
  // Redirect to catg.
  for (let i = 0; i < client.categories.length; i++) {
    try {
      let alias = client.categories[i][1].aliases;
      if (alias)
        for (let j = 0; j < alias.length; j++)
          if (input.toLowerCase() == alias[j])
            return getCatg(client, msg, client.categories[i]);
    } catch {}
  }

  const cmd =
    client.cmds.get(input.toLowerCase()) ||
    client.cmds.get(client.aliases.get(input.toLowerCase()));

  if (!cmd) return getAll(client, msg);

  console.log(cmd);

  const embed = new MessageEmbed()
    .setColor(colorCode(msg))
    .setTitle(`${client.user.username} ${cmd.name}`);

  let getAlias, getDesc, getUsage;

  cmd.aliases
    ? (getAlias = `** Aliases **: *${commaListsOr`${cmd.aliases}`}*\n\n`)
    : (getAlias = "");
  cmd.usage ? (getUsage = `${cmd.name} ${cmd.usage} `) : (getUsage = cmd.name);
  cmd.desc ? (getDesc = cmd.desc + "\n\n") : (getDesc = "");

  embed.setDescription(
    `${getAlias} ${getDesc} ` + ` ** Usage **: \`${prefix} ${getUsage}\``
  );

  return msg.channel.send({ embeds: [embed] });
}
