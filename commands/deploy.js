const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");

const BROT = require("../brotainer.js");
const ConsoleGateway = require("../console/gateway.js");
const storage = require("../commands/storage.js");

module.exports = {
    async deploy(client) {
        
        ConsoleGateway.out("[Brotainer:Commands:Deploy] Deploying application (/) commands....");

        await new Promise(resolve => setInterval(() => {
            if(BROT.token && client.user) resolve();
        }),1000);

        const rest = new REST({ version: '10' }).setToken(BROT.token);

        var all_data = [];
        for(const command of storage.all) {
            if(command.data) all_data.push(command.data);
        }

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: all_data }
        );

        ConsoleGateway.out("[Brotainer:Commands:Deploy] Successfully deployed " + storage.all.length + " application (/) commands");

    }
}