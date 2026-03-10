// Imports
const { Client } = require("discord.js");
const BROT = require("../brotainer.js");
// Client
const client = new Client({
    "intents": []
});

BROT.setAdmins([]);

BROT.setupCommands(
    client,
    "usage/commands",
    BROT.ONERROR__ORDINARY_ONERROR
);
BROT.setupCommandTests(
    [
        BROT.TEST__SLOWMODE_CHECK,
        { name: "Admin check", run: (interaction) => { if(BROT.admins.includes(interaction.user.id)) pass = "override:true"; }},
        { name: "GV-ERR Channel check", run: (interaction) => { return (interaction.channel.id != "1404112649066774579")} }
    ],
    (interaction,results) => {
        if(!results["GV-ERR Channel check"]) interaction.reply("You cannot message here!");
        else interaction.reply("Oops: ```" + JSON.stringify(results,null,2) + "```");
    }
);

client.on("clientReady",() => {
    BROT.log("ready");
});

BROT
    .setToken(require("./config.json").token)
    .login(client);