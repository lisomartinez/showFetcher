const axios = require('axios');
const fs = require('fs');

class Fetcher {
    constructor() {
    }

    writeLog(name) {
        fs.appendFileSync(`./logs/seasons_error.log`, `${Date.now().toString()};${name}\n`, err => {
            if (err) console.log(err);
        });
    }
    async getPage(show) {
        console.log(`http://api.tvmaze.com/shows/${show.id}/seasons`);
        return await axios.get(`http://api.tvmaze.com/shows/${show.id}/seasons`)
            .then(res => {
                const showSeason = [];
                res.data.forEach(season => {
                    season["episodes"] = [];
                    showSeason.push(season);
                });
                show.seasons = showSeason;
                return show;
            })
            .catch(err => {
                this.writeLog(`${show.id}_SEASONS_${err}`);
                console.log(err);
                return "ERROR Season" + err;

            });
    };
}

module.exports = Fetcher;