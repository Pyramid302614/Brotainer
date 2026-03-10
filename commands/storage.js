const commands = [];

module.exports = {

    add(commandObject) {
        commands.push(commandObject);
    },
    get(name) {
        for(const command of commands) {
            if(command.data.name == name) return command;
        }
    },
    all: commands
    
}