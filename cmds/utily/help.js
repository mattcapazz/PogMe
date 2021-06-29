const { colorCode, emoji, msgDelete } = require("../../funcs.js");
const { commaListsOr } = require("common-tags");
const { MessageEmbed } = require("discord.js");

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
  category: "utility",
  description:
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
  //let ctg = client.ctgscmds,
  let desc;
  const embed = new MessageEmbed()
    .setColor(colorCode(msg))
    .setTitle(`${client.user.username}'s Functions`);
  desc = `To check out a command or a section type \`${prefix} help [command/section]\`.`;

  if (msg.channel.type == "dm" || msg.member.hasPermission("MANAGE_MESSAGES"))
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
    "`{}` implies that it's either required or not based on the usage\n" +
    "**Don't include the `[]`, `()` & `{}` symbols in the command!**\n\u200b";
  embed.setDescription(desc);

  //embed.addField("", "\u200b");

  embed.addField(
    ":chart_with_upwards_trend: Info. / Statistics",
    `*Get information about users, emotes, channels etc. and live counters.*\n**2 commands**`,
    true
  );

  embed.addField(
    ":flashlight: Utility",
    `*Useful leftover commands that don't fit elsewhere.*\n**2 commands**`,
    true
  );

  if (args) return msg.channel.send(embed);
  if (msg.channel.type == "text")
    msgDelete(
      msg,
      `**Gotcha** ${
        msg.author
      }! I've sent you a DM with my commands n' stuff. Please check your DMs! ${emoji(
        "senkoHappy"
      )}`
    );
  return msg.author.send(embed);
}

function getCMD(client, msg, input) {
  const cmd =
    client.cmds.get(input.toLowerCase()) ||
    client.cmds.get(client.aliases.get(input.toLowerCase()));
  if (!cmd) return getAll(client, msg);

  const embed = new MessageEmbed()
    .setColor(colorCode(msg))
    .setTitle(`${client.user.username} ${cmd.name}`);

  let getUsage, embedDesc;

  cmd.usage ? (getUsage = `${cmd.name} ${cmd.usage}`) : (getUsage = cmd.name);
  cmd.aliases
    ? (embedDesc = `**Aliases**: *${commaListsOr`${cmd.aliases}`}*\n\n`)
    : (embedDesc = "");
  embedDesc +=
    `${cmd.description}\n\n` + `**Usage**: \`${prefix} ${getUsage}\``;
  embed.setDescription(embedDesc);

  return msg.channel.send(embed);
}
