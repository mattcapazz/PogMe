module.exports = {
  aliases: ["ejson"],
  name: "jsonencode",
  run: async (client, msg, args) => {
    return console.log(JSON.parse(args.join(' ')))
  },
};
