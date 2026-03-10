const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test2")
        .setDescription("Does something?"),
    async execute(interaction) {
        console.log("e!");
    },
    onerror(e,interaction) {
        interaction.reply("Oh noes! ```" + e + "```");
    }
}