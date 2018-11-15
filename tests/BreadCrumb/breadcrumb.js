let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    BREADCRUMB: require("../../testing_url").BREADCRUMB
}
var file_name;

//run view source as headless reader

var nightwatch = require("../../nightwatch.json");
if(nightwatch.test_settings && nightwatch.test_settings.chrome.desiredCapabilities && nightwatch.test_settings.chrome.desiredCapabilities.chromeOptions.args){
    let convert_to_headless = nightwatch.test_settings.chrome.desiredCapabilities.chromeOptions.args.toString().split(",");
    convert_to_headless.push("--headless")
    nightwatch.test_settings.chrome.desiredCapabilities.chromeOptions.args = convert_to_headless;
}

let test_cases = {}

Object.keys(page_config.BREADCRUMB).map((value, index) => {
    let test_case_details = page_config.BREADCRUMB[value]
    let copy_test = Object.assign({
        [`${index} ${test_case_details.tag}`]: function (client) {
            client.url(test_case_details.url)
            client.waitForElementVisible("body", 1000)
            client.pause(2000)
            client.verify.BreadCrumb(test_case_details["nos_of_breadCrumb_tags"])
            client.end()
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