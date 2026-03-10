const STORAGE = require("./storage.js");

module.exports = {
    
    CONSOLE_RIGHTS: (v) => { if(v) STORAGE.CONSOLE_RIGHTS = v; else return STORAGE.CONSOLE_RIGHTS },

    COMMANDS: (v) => { if(v) STORAGE.COMMANDS = v; else return STORAGE.COMMANDS },
    EVENTS: (v) => {  if(v) STORAGE.EVENTS = v; else return STORAGE.EVENTS },
    CONSOLE_SYNC: (v) => { if(v) STORAGE.CONSOLE_SYNC = v; else return STORAGE.CONSOLE_SYNC },

    token: (v) => { if(v) STORAGE.token = v; else return STORAGE.token },

    admins: (v) => { if(v) STORAGE.admins = v; else return STORAGE.admins },

    setAdmins(admins) {
        STORAGE.admins = admins;
    },

    setupCommands(client,dir,defaultOnError) {
        STORAGE.COMMANDS = true;
        if(dir) require("./commands/load.js").traverse(process.cwd()+"/"+dir);
        for(let i = 0; i < require("./commands/storage.js").all.length; i++) {
            if(!require("./commands/storage.js").all[i].onerror) require("./commands/storage.js").all[i].onerror = defaultOnError;
        }
        if(client) client.on("interactionCreate",require("./commands/hook.js").onInteraction);
        require("./commands/deploy.js").deploy(client);
    },
    ONERROR__ORDINARY_ONERROR: require("./commands/hook.js").ORDINARY_ONERROR,
    setupCommandTests(tests,onfail) {
        require("./commands/tests.js").tests = tests;
        if(onfail) require("./commands/tests.js").onfail = onfail;
    },
    TEST__SLOWMODE_CHECK: { name: "Slowmode Check", run: require("./commands/tests.js").slowmode_check },

    setupEvents(client,dir) {
        STORAGE.EVENTS = true;
        require("./events/load.js").traverse
        require("./events/hook.js").setupEvents(client);
    },

    setupConsoleSync(client,guild,channel) {
        STORAGE.CONSOLE_SYNC = true;
    },

    setToken(token) {
        STORAGE.token = token;
        return this;
    },
    login(client) {
        client.login(STORAGE.token);
    },
    log(msg) {
        require("./console/gateway.js").out(msg);
    }
} 