const ShowPageFetcher = require("./showFetcher.js");
const SeasonsFetcher = require("./seasonFetcher.js");
const EpisodesFetcher = require("./episodeFetcher.js");
const pLimit = require('p-limit');
const limit = pLimit(1);
const fs = require('fs');

const showFetcher = new ShowPageFetcher();
const seasonsFetcher = new SeasonsFetcher();
const episodeFetcher = new EpisodesFetcher();



getShows = async () => {
    let page = 0;
    let res = await showFetcher.getPage(page).then(r => r);

    function writeLog(name) {

        fs.appendFileSync(`./logs/pages.log`, `${Date.now()};${name}\n`, err => {
            if (err) console.log(err);
        });
    }

    let numbers = [];
    try {
        fs.readFile(`./logs/pages.log`, 'utf8', (e, d) => {
            const page = d.toString().split("\n").forEach(page => page.split(";")[1]);
            numbers.push(page);
        });
    } catch (e) {
        writeLog("reads");
    }


    const pageInLog = element => element === page;

    while (res !== null) {
        try {
            if (numbers.findIndex(pageInLog) === -1) {
                res = await showFetcher.getPage(page);
                const showPageWithSeasons = await showWithSeasons(res);
                const showWithSeasonAndEpisodes = await showWithEpisodes(showPageWithSeasons);
                const r = JSON.stringify(showWithSeasonAndEpisodes, null, 4);
                fs.writeFileSync(`./show/page${page}.json`, r, err => {
                    if (err) console.log(err);
                });

                writeLog(`${page}`);
            }
        } catch (e) {
            console.log(e);
        }
        page++;

    }
};

const showWithSeasons = (shows) => {
    // console.log(shows);
    // if (shows === "404") return "404";
    let prom = [];
    try {
        shows.map(show => prom.push(limit(() => seasonsFetcher.getPage(show))));
    } catch (e) {
        console.log(e)
    }
    return Promise.all(prom);
};

const showWithEpisodes = (shows) => {
    // if (shows === "404") return "404";
    let prom = [];
    try {
        shows.map(show => prom.push(limit(() => episodeFetcher.getPage(show))));
    } catch (e) {
        console.log(e);
    }
    return Promise.all(prom);
};

getShows();

