exports.seoSearchTextLogic = (browser, checker, searchPattern, cb) => {
    let checkCounter = 0;
    searchPattern.map((v, i) => {
        if (checker.toLowerCase().indexOf(v.toLowerCase()) > -1) {
            checkCounter++;
        }
    })
    cb(null, {
        checkCounter: checkCounter,
        browser: browser
    })
}