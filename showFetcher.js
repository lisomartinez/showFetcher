const axios = require('axios');
const fs = require('fs');

class ShowFetcher {
    constructor() {
    }

    writeLog(name) {
        fs.appendFileSync(`./logs/shows_error.log`, `${Date.now().toString()};${name}\n`, err => {
            if (err) console.log(err);
        });
    }

    async getPage(number) {
        console.log(`http://api.tvmaze.com/shows?page=${number}`);
        return await axios.get(`http://api.tvmaze.com/shows?page=${number}`)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
                this.writeLog(`${number}_PAGE_${err}`);
                return null;
            });
    };
}

module.exports = ShowFetcher;