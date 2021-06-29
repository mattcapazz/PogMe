//  Load all the commands, from ./cmds folder.
const { readdirSync, readFileSync } = require("fs");

module.exports = (client) => {
  readdirSync("./cmds/").forEach(function callback(cat, idx) {
    const dir = readdirSync(`./cmds/${cat}/`).filter((file) =>
      file.endsWith(".js")
    );

    const evalFile = (file) => {
      try {
        return JSON.parse(readFileSync(file));
      } catch {}
    };

    client.categories[idx] = [
      cat,
      evalFile(`./cmds/${cat}/cfg.json`),
      dir,
    ];

    for (let file of dir) {
      let cmd = require(`./cmds/${cat}/${file}`);
      if (cmd.name) client.cmds.set(cmd.name, cmd);
      if (cmd.aliases && Array.isArray(cmd.aliases))
        cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    }
  });
};
