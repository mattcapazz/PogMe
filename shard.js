const { ShardingManager } = require("discord.js");
const config = require("./config.json");

const shards = new ShardingManager("./index.js", {
  token: config.token,
  totalShards: "auto",
  respawn: true,
});

shards.on("shardCreate", (shard) => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`
  );
});

shards.spawn(shards.totalShards, 1000, Infinity);