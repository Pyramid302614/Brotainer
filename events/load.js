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
            file.once = file.once ?? false;
            file.execute = file.execute = () => {};

            require("./storage.js").add(file);
                
        }

    }
}