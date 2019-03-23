const axios = require('axios');
const fs = require('fs');

class Fetcher {
    constructor() {
    }

    writeLog(name) {
        fs.appendFileSync(`./logs/episodes_error.log`, `${Date.now().toString()};${name}\n`, err => {
            if (err) console.log(err);
        });
    }

    async getPage(show) {
        console.log(`http://api.tvmaze.com/shows/${show.id}/episodes?specials=1`);
        return await axios.get(`http://api.tvmaze.com/shows/${show.id}/episodes?specials=1`)
            .then(res => {
                let showSeasons = show.seasons;
                res.data.forEach(episode => {
                    try {
                        let season = showSeasons.filter(season => season.number === episode.season);
                        season[0].episodes.push(episode);
                    } catch (e) {
                        console.log(e);
                        this.writeLog(`${show.id}_EPISODES_${e}`);
                    }
                });

                return show;
            })
            .catch(err => {
                this.writeLog(`${show.id}_EPISODES_${err}`);
            });
    };
}

module.exports = Fetcher;