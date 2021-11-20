const { colorCode, createGuild } = require("../funcs.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, msg) => {
  if (msg.author.bot) return;
  let prefixes = client.prefixes;

  for (let i = 0; i < prefixes.length; i++) {
    _tmp = msg.content.charAt(0).toLowerCase() + msg.content.slice(1);

    if (_tmp.startsWith(prefixes[i])) {
      _tmp = _tmp.replace(prefixes[i], "");

      const args = _tmp.split(" ");
      let cmd = args.shift().toLowerCase();

      for (let i = 0; i != args.length; i++)
        if (
          client.cmds.get(`${cmd} ${args[i]}`) ||
          client.aliases.get(`${cmd} ${args[i]}`)
        )
          cmd += ` ${args[i]}`;

      let command = client.cmds.get(cmd);
      if (!command) command = client.cmds.get(client.aliases.get(cmd));
      if (command) command.run(client, msg, args);
    }
  }

  /*const rng = 20
  const id = msg.guild.id;
  const db = require("../index").db;

  if (!client.sv[`${id}`]) {
    db.get(`SELECT halloweenChannel AS c FROM server WHERE id = ?`, id, (err, row) => {
      if (!row) return;
      client.sv[`${id}`] = [1, Math.floor((Math.random() * rng) + rng), row.c]
    })
  } else if (msg.channel.id == client.sv[`${id}`][2]) client.sv[`${id}`][0]++

  let sv = client.sv[`${id}`]
  if (sv && sv[0] == sv[1]) {
    // Reset
    sv[0] = 1
    sv[1] = Math.floor((Math.random() * rng) + rng)
    createGuild(id);
    db.get(`SELECT halloweenChannel AS c FROM server WHERE id = ?`, id, (err, row) => {
      if (row.c) {
        let monster,
          itemProb,
          door,
          aRow = new MessageActionRow();

        //console.log(matrix)
        // * 6 ~ Being the total of monsters pics
        monster = Math.floor(Math.random() * 14 + 1);
        let mm = client.matrix[monster];
        itemProb = Math.random();
        door = Math.floor(Math.random() * 5 + 0);

        //msg.channel.send(`\`DEBUG\`: Correct door: ${door + 1}, Item Probability: ${itemProb}`);
        // rnd ~ Being the correct door number and
        // for() ~ Generate 5 door buttons
        for (i = 0; i < 5; i++) {
          let btn = new MessageButton().setStyle("SECONDARY").setEmoji("🚪");
          if (i == door) {
            //console.log(monster, monster-1, monster - 1 * 3)
            if (itemProb <= 0.15)
              btn.setCustomId(`spoopy:${mm[3]}-${mm[0]};3=${(monster - 1) * 3 + 3}`);
            else if (itemProb <= 0.45)
              btn.setCustomId(`spoopy:${mm[2]}-${mm[0]};2=${(monster - 1) * 3 + 2}`);
            else
              btn.setCustomId(`spoopy:${mm[1]}-${mm[0]};1=${(monster - 1) * 3 + 1}`);
          } else btn.setCustomId(`spoopy:${i}`);
          aRow.addComponents(btn);
        }

        const embed = new MessageEmbed()
          .setColor(colorCode(msg))
          .setTitle("A spooOky monster has stopped by!")
          .setDescription("**Quick**!!1 Open the right door and greet them before\nsomeone else does it or before the trick-or-treater\ngoes away!")
          .setImage(`https://cdn.discordapp.com/attachments/858400861990158376/${mm[4]}/spoopyMonster.png`);

        return client.channels.cache.get(row.c).send({
          embeds: [embed],
          components: [aRow],
        }).then((m) => {
          setTimeout(function () {
            m.edit({ components: [] }) // Delete Buttons
            console.log(m.fetch().then((m) => { console.log(m.embeds[0].title) }))
          }, (Math.random() * 1 + 6) * 1000)
        })
      }
      else console.log("no channel")
      // Spawn a mob if thingy setup'd
    })
  }
  console.log(client.sv)*/
};
