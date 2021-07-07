module.exports = (client, member) => {
  const db = require("../index").db;
  db.get(`SELECT wc, wm FROM server WHERE id = ?`, member.guild.id, (err, row) => {
    let channel = client.guilds.cache.get(member.guild.id).channels.cache.get(row.wc), wm = row.wm;

    wm = wm.replace(/{member}/g, member); // {member}
    wm = wm.replace(/{membercount}/, member.guild.members.cache.filter(member => !member.user.bot).size) //{membercount}

    channel.send(wm);
  });
};