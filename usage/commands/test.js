const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test")
        .setDescription("Does nothing"),
    async execute(interaction) {
        console.log("e!");
    }
}