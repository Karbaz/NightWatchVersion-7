require("./node_modules/nightwatch/bin/runner")
var pageConfig = {
    getApiUrlFromTerminal: require("./globals_path").getApiUrlFromTerminal
}
var urlsConfig = {
    "L": "https://www.bewakoof.com/", //live url
    "P": "https://p1.bewakoof.com/", // p1 to p6 url
    "T": "https://localhost:4000/", //local host
    "B": "http://localhost:5001/"
}

var slackConfig = {
    "A": {
        web_hook: "https://hooks.slack.com/services/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",
        channel: "#automation-testing"
    },
    "P": {
        web_hook: "https://hooks.slack.com/services/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",
        channel: "#p_series_testing"
    },
    "L": {
        web_hook: "https://hooks.slack.com/services/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",
        channel: "#live_testing"
    }
}



//default ( url and slack) config
module.exports.LIVE = "https://localhost:4000/"
module.exports.SLACK = slackConfig["A"];


// hardcode to check in slack or url config pass as args
let slack = "--slack",
    api = "--api"

if (process.argv) {
    process.argv.map((v, i) => {
        let split_val = v.split("=")
        if (split_val.length > 0) {
            split_val.map((a, b) => {
                switch (a) {
                    case slack:
                        if (split_val.length > 1) {
                            this.SLACK = slackConfig[split_val[split_val.length - 1]]
                        }
                        break;

                    case api:
                        if (split_val.length > 1) {
                            this.LIVE = urlsConfig[split_val[split_val.length - 1]]
                        }
                        break;

                    default:
                        break;
                }
            })
        }
    })
}