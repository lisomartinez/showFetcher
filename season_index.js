const fs = require('fs');
const Fetcher = require("./fetchSeasons.js");
const fetcher = new Fetcher();
const pLimit = require('p-limit');
const limit = pLimit(1);

const showsSeasons = async () => {
    fs.readdir("./show/", (err, files) => {
        files.forEach(async file => {
            let openfile = fs.readFileSync(`./show/${file}`);
            let show = JSON.parse(openfile);
            const updatedShow = await showWithSeasons(show);
            fs.writeFile(`./seasons/${file}`, JSON.stringify(updatedShow, null, 4), err => {
                if (err) console.log(err);
                console.log(updatedShow);
            });
        });
    })
};

const showWithSeasons = (shows) => {
    let prom = [];
    shows.map(show => {
        prom.push(limit(() => fetcher.getPage(show)));
    });
    return Promise.all(prom);
};


showsSeasons();

