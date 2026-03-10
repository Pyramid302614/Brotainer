const BROT = require("../brotainer.js");

module.exports = {
    in(msg) {

    },
    async out(msg) {
        if(BROT.CONSOLE_RIGHTS) {
            console.log(msg);
            if(BROT.CONSOLE_SYNC) await discordOut(msg);
        }
    }
}

async function discordOut(msg) {

}