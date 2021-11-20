module.exports = {
  aliases: ["rl", "refresh"],
  name: "reload",
  run: async (client, msg, args) => {
    if (msg.author.id == "156165749889695744") {
      msg.react("<:checkmark:862198124395495434>").then(() => justRestart());
    } else return;
  },
};
