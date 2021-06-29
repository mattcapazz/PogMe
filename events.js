//  Load all the events, from ./events folder.
const { readdirSync } = require("fs");

module.exports = (client) => {
  readdirSync("./events").forEach((file) => {
    let event = require(`./events/${file}`),
      eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
};
