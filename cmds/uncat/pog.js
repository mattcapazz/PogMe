const { MessageEmbed } = require("discord.js");
const { colorCode } = require("../../funcs.js");

module.exports = {
  desc: "Check my ping to see if there's an issue on how long I'm taking to reply.",
  name: "pog",
  run: async (client, msg) => {
    const arrEmojis = Array(
      "a812116893661528115",
      "a812221280023216130",
      "a812221466443120649",
      "a812221706084941844",
      "812103131914960918",
      "812103935551995965",
      "812104149701099562",
      "812105909869871134",
      "812116668259369000",
      "812118926859173898",
      "812219909152178186",
      "812220640002048020"
    );
    let emoji = arrEmojis[Math.floor(Math.random() * arrEmojis.length)];
    emoji.startsWith("a")
      ? (emoji = `<a:pog:${emoji.substring(1)}>`)
      : (emoji = `<:pog:${emoji}>`);

    const arrGifs = Array(
      "https://cdn.discordapp.com/attachments/812075464138031154/812107152054943744/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812107230274387978/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812107313573920838/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812107816567308339/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108000071778324/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108081898848276/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108169202630676/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812222331187232778/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108426217127936/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108490918461470/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108574167662613/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108619222614016/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108729926418462/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812108787175129088/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812219182116372530/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812219536820535316/pog.gif",
      "https://cdn.discordapp.com/attachments/812075464138031154/812431085355008030/pog.gif"
    );
    let gif = arrGifs[Math.floor(Math.random() * arrGifs.length)];

    const arrPunc = Array(".", "!", "!!", "!!1", "!!!");
    let punc = arrPunc[Math.floor(Math.random() * arrPunc.length)];

    const arrSelf = Array(
      "is having a poggers momento",
      "havin' a pog moment",
      "is feeling super pog",
      "is feeling mega pog",
      "is feeling pog"
    );
    let self = arrSelf[Math.floor(Math.random() * arrSelf.length)];

    let embed = new MessageEmbed();
    embed.setColor(colorCode(msg));
    //const embed = new MessageEmbed().setColor(colorCode(msg)).setImage(gif);
    embed.setImage(gif);

    let users = msg.mentions.members;
    let iterator = users.entries();
    let first;

    if (users.size > 0) first = iterator.next().value[1];

    // Reset iterator
    iterator = users.entries();

    if (users.size == 0 || first.id == msg.author.id)
      embed.setTitle(`${emoji} ${msg.member.displayName} ${self}${punc}`);
    else {
      let str = "";

      if (users.size > 1)
        for (i = 0; i < users.size; i++) {
          let _tmp = iterator.next().value[1].displayName;

          if (i < users.size - 1) str += `${_tmp}, `;
          else {
            str = str.slice(0, -2);
            str += ` and ${_tmp} are`;
          }
        }
      else str = `${first.displayName} is`;

      embed.setTitle(
        `${emoji} ${msg.member.displayName} thinks ${str} poggers${punc}`
      );
    }

    return msg.channel.send({ embeds: [embed] });
  },
};
