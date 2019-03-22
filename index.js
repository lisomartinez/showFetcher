const Fetcher = require("./fetcher.js");
const fetcher = new Fetcher();

getShows = async () => {
    let page = 1;
    let res = await fetcher.getPage(page).then(r => r);

    while (res !== "404") {
        page++;
        res = await fetcher.getPage(page).then(r => r);
    }
};

getShows();

