const fs = require('fs');

class Logger {
    constructor(className, type) {
        this.className = className;
        this.type = type;
    }

    logWtihDate(message) {
        fs.appendFileSync(`./logs/${this.className}_${this.type}.log`, `${Date.now().toString()};${message}\n`, err => {
            if (err) console.log(err);
        });
    }
}

exports.logger = Logger;