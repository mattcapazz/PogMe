module.exports = {
  name: "kedme",
  run: async (client, msg) => {
    msg.reply(":door:").then((m) => {
      setTimeout(function () {
        m.edit(`<:ked:910275921133576212>:door:`);
      }, 3000);
      setTimeout(function () {
        m.edit(
          `<:ked:910275921133576212>:door:\n*Ked shows up next to the door.*`
        );
      }, 6000);

      setTimeout(function () {
        m.edit(
          `<:ked:910275921133576212>:door:\n*Ked shows up next to the door.*\n.`
        );
      }, 9000);
      setTimeout(function () {
        m.edit(
          `<:ked:910275921133576212>:door:\n*Ked shows up next to the door.*\n..`
        );
      }, 11000);
      setTimeout(function () {
        m.edit(
          `<:ked:910275921133576212>:door:\n*Ked shows up next to the door.*\n...`
        );
      }, 13000);

      setTimeout(function () {
        m.edit(
          `<:ked:910275921133576212>:door:\n*Ked is there against his own will.*`
        );
      }, 16000);

      setTimeout(function () {
        m.edit(`*<:ked:910275921133576212> is leaving*`);
      }, 22000);
      setTimeout(function () {
        m.edit(`*<:ked:910275921133576212> just left.*`);
      }, 27000);
      setTimeout(function () {
        m.edit(`*<:ked:910275921133576212> just left.* :pensive:`);
      }, 29000);
    });
  },
};
