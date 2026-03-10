const storage = require("./storage.js");
const tests = require("./tests.js");
const BROTSTR = require("../storage.js");

const { MessageFlags } = require("discord.js");

module.exports = {
    async onInteraction(interaction) {

        if(BROTSTR.COMMANDS) {

            if(interaction.isChatInputCommand()) {

                const name = interaction.commandName;
                
                const tests_results = tests.test(interaction);

                const command = storage.get(name);
                if(tests_results.pass) try { await command.execute(interaction); } catch(e) { command.onerror(e,interaction); }
                else await tests.onfail(interaction,tests_results.results);

            }

        }

    },
    async ORDINARY_ONERROR(e,interaction) {

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!\n`'+e.message+'`', flags: [ MessageFlags.Ephemeral ] });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!\n`'+e.message+'`', flags: [ MessageFlags.Ephemeral ] });
        }

    }
}