module.exports = {
    data: "clientReady",
    once: true,
    async execute(client) {
        console.log("Client ready! (Logged in as " + client.user.username + ")");
    }
}