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
        if (client.cmds.get(`${cmd} ${args[i]}`)) cmd += ` ${args[i]}`;

      let command = client.cmds.get(cmd);
      if (!command) command = client.cmds.get(client.aliases.get(cmd));
      if (command) command.run(client, msg, args);
    }
  }
};
