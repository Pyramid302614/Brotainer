const { PermissionFlagsBits } = require("discord.js");

module.exports = {

    tests: [],
    onfail: async () => {},

    test(interaction) {

        var pass = true;
        var results = {};
        for(const test of this.tests) {
            try {
                const res = test.run(interaction);
                results[test.name] = res;
                if(!res && res.split(":")[0] != "override") pass = false;
                if(res.split(":")[0] == "override") pass = res;
            } catch(ignored) {
                results[test.name] = "Error";
            }
        }
        if(typeof pass == "string" && pass.split(":")[0] == "override") pass = pass.split(":")?.[1] != "false";
        return {
            "pass": pass,
            "results": results
        };

    },

    


    async slowmode_check(interaction) {

        try {
            const member = await interaction.guild.members.fetch(interaction.user.id);
            if(member.permissions.has(PermissionFlagsBits.BypassSlowmode)) return 1;

            const slowmode = interaction.channel.rateLimitPerUser; // gives seconds
            const messages = await interaction.channel.messages.fetch();

            const interactionTimestamp = Math.floor(interaction.createdTimestamp/1000);

            var lastMessageTimestamp = 0;
            for(const messageEntry of messages) {
                const message = messageEntry[1];
                if(message.author == interaction.author && lastMessageTimestamp < interactionTimestamp) lastMessageTimestamp = Math.floor(message.createdTimestamp/1000);
                
            }
            
            return (interactionTimestamp > lastMessageTimestamp + slowmode)?1:0;
        } catch(ignored) { return false; }
    }

}