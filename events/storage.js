const events = [];

module.exports = {
    async add(name,once,execute) {
        events.push({
            name: name,
            once: once,
            execute, execute
        });
    },
    async get(name) {
        for(const event of events) {
            if(event.name == name) return event;
        }
        return null;
    },
    all: events
}