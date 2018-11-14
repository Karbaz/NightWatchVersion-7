let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    IMAGES_TITLE_ALT_TAG: require("../../testing_url").IMAGES_TITLE_ALT_TAG
}
var file_name;
var cheerio = require("cheerio")

let test_cases = {}

Object.keys(page_config.IMAGES_TITLE_ALT_TAG).map((value, index) => {
    let test_case_details = page_config.IMAGES_TITLE_ALT_TAG[value]
    let copy_test = Object.assign({
        [`${index} ${test_case_details.tag}`]: function (client) {
            client.url(test_case_details.url)
            client.waitForElementVisible("body", 1000)
            client.source(function (res) {
                $ = cheerio.load(res.value)
                var scripts = $("img")
                scripts.map((index, val) => {
                    if (val.name === "img") {
                        this.verify.ok(val.attribs.title, `Title ${val.attribs.src}`)
                        this.verify.ok(val.attribs.src, `Src ${val.attribs.src}`)
                        this.verify.ok(val.attribs.alt, `Alt ${val.attribs.src}`)
                    }
                })
            })
        },
        afterEach: function (browser, done) {
            if (browser.currentTest && browser.currentTest.results && browser.currentTest.results.testcases) {
                let object_first_key = Object.keys(browser.currentTest.results.testcases)[0]
                file_name = browser.currentTest.module ? browser.currentTest.module : null
                if (browser.currentTest.results.testcases && browser.currentTest.results.testcases[object_first_key]) {
                    let fail_check = browser.currentTest.results.testcases[object_first_key]
                    if (fail_check.failed > 0 || fail_check.errors > 0) {
                        if (fail_check && fail_check.assertions && fail_check.assertions.length > 0) {
                            fail_check.assertions.map((v, i) => (v.fullMsg && v.fullMsg.length > 0) ? test_case_failure_collections.push(v) : null)
                        }
                    }
                }
            }
            done()
        },
        after: function (browser, done) {
            let con = page_config.slackWebHook;
            con["test"] = test_case_failure_collections;
            con["fileName"] = file_name
            con["url"] = page_config.url_pointer

            if (test_case_failure_collections.length > 0) {
                page_config.SlackNotification.sendFailureSlackNotification(con)
            } else {
                page_config.SlackNotification.sendSuccessSlackNotification(con)
            }
            done()
        }
    }, test_cases)
    test_cases = copy_test;
})


module.exports = test_cases