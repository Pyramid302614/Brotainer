const fs = require("fs");

const storage = require("./storage.js");

module.exports = {

    traverse(dir) {

        var files = [];

        const traverse = (dir) => {

            const items = fs.readdirSync(dir);
            for(const item of items) {
                if(item.endsWith(".js")) files.push(dir+"/"+item);
                if(!item.includes(".")) traverse(dir+"/"+item);
            }

        }

        traverse(dir);

        for(var file of files) {
            
            file = require(file);
            
            if(!file.data) return;
            file.execute = file.execute ?? async function() {}
            file.buttons = file.buttons ?? [];

            storage.add(file);

        }
    
    }
    
}