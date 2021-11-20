require("dotenv").config();

module.exports = {
  colorCode: function (msg) {
    // @TOFIX: Instead of retrieving the whole `msg` arg., get displayHexColor only
    try {
      let color =
        msg.channel.type == "dm"
          ? process.env.embed_default_color
          : msg.guild.me.displayHexColor;
      if (color == "#000000") color = process.env.embed_default_color;
      return color;
    } catch {
      return process.env.embed_default_color;
    }
  },

  createUser: function (id) {
    return new Promise((res) => {
      setTimeout(() => {
        const db = require("./index").db;
        db.get(
          `SELECT COUNT() AS count FROM user WHERE id = ?`,
          id,
          (err, row) => {
            if (row.count == 0) db.run(`INSERT INTO user(id) VALUES (?)`, id);
            res("Resolved!");
          }
        );
      });
    });
  },

  createServerUser: function (idServer, idUser) {
    return new Promise((res) => {
      setTimeout(() => {
        const db = require("./index").db;
        db.get(
          `SELECT COUNT() AS count FROM serverUser WHERE idServer = ? AND idUser = ?`,
          [idServer, idUser],
          (err, row) => {
            if (!row.count)
              db.run(`INSERT INTO serverUser(idServer, idUser) VALUES (?, ?)`, [
                idServer,
                idUser,
              ]);
            res("Resolved!");
          }
        );
      });
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
    if (process.env.debug_messages == "true")
      console.log(`[DEBUG][${require("./funcs.js").date()}]: ${log}`);
  },

  emoji: function (emoji) {
    const client = require("./index").client;
    let guild = client.guilds.cache.get(process.env.get_emojis_from_guild);
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
