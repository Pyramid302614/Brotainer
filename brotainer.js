module.exports = {

    interactionEventHook: require("./commands/events.js").onInteraction,
    setupInteractionEventHook(client) {
        if(client) client.on("interactionCreate",this.interactionEventHook);
    }
    
} 