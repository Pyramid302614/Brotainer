const storage = require("./storage.js");

module.exports = {
    async onInteraction(interaction) {

        if(interaction.isChatInputCommand()) {

            const name = interaction.commandName;
            
            await storage.get(name).execute(interaction);

        }
    }
}