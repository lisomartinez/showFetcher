const axios = require('axios');
const fs = require('fs');

class Fetcher {
    constructor() {
    }

    async getPage(number) {
        return await axios.get(`http://api.tvmaze.com/shows?page=${number}`)
            .then(res => {
                const r = JSON.stringify(res.data, null, 4);
                fs.writeFile(`./show/page${number}.json`, r, err => {
                    if (err) console.log(err);
                });
                return "201";
            })
            .catch(err => {
                return "404";
            });
    };
}

module.exports = Fetcher;