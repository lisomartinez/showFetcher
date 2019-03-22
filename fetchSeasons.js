const axios = require('axios');

class Fetcher {
    constructor() {
    }

    async getPage(show) {
        console.log(`http://api.tvmaze.com/shows/${show.id}/seasons`);
        return await axios.get(`http://api.tvmaze.com/shows/${show.id}/seasons`)
            .then(res => {
                const showSeason = [];
                res.data.forEach(season => {
                    showSeason.push(season);
                    // console.log(seasonJson)
                });
                // console.log(showSeason);
                show.seasons = showSeason;
                // console.log(show);
                // fs.writeFile(`./seasons/test.json`, JSON.stringify(show, null, 4), err => {
                //     //         console.log(updatedShow)
                //     if (err) console.log(err);
                //     //     });
                // });
                return show;
            })
            .catch(err => {
                console.log(err.response);
                return err;
            });
    };
}

module.exports = Fetcher;