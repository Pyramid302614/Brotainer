module.exports = {

    CONSOLE_RIGHTS: true,

    COMMANDS: false,
    EVENTS: true,
    CONSOLE_SYNC: false,

    token: null,

    admins: [],

    setAdmins(admins) {
        this.admins = admins;
    },

    setupCommands(client,dir,defaultOnError) {
        this.COMMANDS = true;
        if(dir) require("./commands/load.js").traverse(process.cwd()+"/"+dir);
        for(let i = 0; i < require("./commands/storage.js").all.length; i++) {
            if(!require("./commands/storage.js").all[i].onerror) require("./commands/storage.js").all[i].onerror = defaultOnError;
        }
        if(client) client.on("interactionCreate",require("./commands/events.js").onInteraction);
        require("./commands/deploy.js").deploy(client);
    },
    ONERROR__ORDINARY_ONERROR: require("./commands/events.js").ORDINARY_ONERROR,
    setupCommandTests(tests,onfail) {
        require("./commands/tests.js").tests = tests;
        if(onfail) require("./commands/tests.js").onfail = onfail;
    },
    TEST__SLOWMODE_CHECK: { name: "Slowmode Check", run: require("./commands/tests.js").slowmode_check },

    setupEventsDir(client,dir) {
        this.EVENTS = true;
    },

    setupConsoleSync(client,guild,channel) {
        this.CONSOLE_SYNC = true;
    },

    setToken(token) {
        this.token = token;
        return this;
    },
    login(client) {
        client.login(this.token);
    }
    
} 