const config = require("./config.json");

module.exports = {
  colorCode: function (msg) {
    // @TOFIX: Instead of retrieving the whole `msg` arg., get displayHexColor only
    let color =
      msg.channel.type == "dm"
        ? config.embedDefaultColor
        : msg.guild.me.displayHexColor;
    if (color == "#000000") color = "#2F3136";
    return color;
  },

  createUser: function (id) {
    const db = require("./index").db;
    db.get(`SELECT COUNT() AS count FROM user WHERE id = ?`, id, (err, row) => {
      if (row.count == 0) db.run(`INSERT INTO user(id) VALUES (?)`, id);
    });
  },

  createGuild: function (id) {
    /* The server doesn't exist in the database. May be due because the bot was added to a server while offline
    Func. happens when bot enters a new server too */
    const db = require("./index").db;
    db.get(
      `SELECT COUNT() AS count FROM server WHERE id = ?`,
      id,
      (err, row) => {
        if (row.count == 0) db.run(`INSERT INTO server(id) VALUES (?)`, id);
      }
    );
  },

  date: function () {
    return new Date().toString().split(" ", 5).join(" ");
  },

  debug: function (log) {
    if (config.debugMessages == "true")
      console.log(`[DEBUG][${require("./funcs.js").date()}]: ${log}`);
  },

  emoji: function (emoji) {
    const client = require("./index").client;
    let guild = client.guilds.cache.get(config.getEmojisFromGuild);
    if (guild) {
      let _emj;
      guild.emojis.cache.forEach((emj) => {
        if (emj.name == emoji) _emj = `<:${emj.name}:${emj.id}>`;
      });
      if (_emj) return _emj;
      else return "❔ (Unknown emoji)";
    } else {
      return "❔ (Unknown guild provided in `config.json` file)";
    }
  },

  executor: function (user, author) {
    if (user !== author) {
      if (author.avatar.startsWith("a_")) {
        //If author has a animated pfp
        return [
          `Command executed by: ${author.tag}`,
          author.avatarURL({
            format: "gif",
          }),
        ];
      } else return [`Command executed by: ${author.tag}`, author.avatarURL()];
    } else return ["", ""];
  },

  msgDelete: function (msg, text, time) {
    if (!time) time = 8000;
    msg.channel
      .send(text)
      .then((newMsg) => {
        msg.delete({
          timeout: time,
        });
        newMsg.delete({
          timeout: time,
        });
      })
      .catch((err) => console.log(err));
  },
};
