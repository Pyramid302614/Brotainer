const storage = require("./storage.js");
const BROTSTR = require("../storage.js");

module.exports = {
    setupEvents(client) {
        for(const event of storage.all) {
            try {
                client.on(event.name,event.execute);
            } catch(e) {
                if(BROTSTR.CONSOLE_RIGHTS)
                    console.log("[Brotainer:EventsHook] Failed to hook event to client: " + event.name);
            }
        }
    }
}