require("nightwatch/bin/runner")
var pageConfig = {
    getApiUrlFromTerminal: require("./globals_path").getApiUrlFromTerminal
}
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
                        console.log("slack")
                        break;

                    case api:
                        console.log("api")
                        break;

                    default:
                        break;
                }
            })
        }
    })
}