let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    common_login: require("../../globals_path").common_login,
    common_logout: require("../../globals_path").common_logout
}
var file_name;
module.exports = {
    '@tags': ['login'],
    'Basic Login With UserName And Password': function (client) {
        client.useXpath()
        client.url(page_config.url_pointer)
        page_config.common_login(client)
        page_config.common_logout(client)
        client.end()
    },
    afterEach: function (browser, done) {
        if (browser.currentTest && browser.currentTest.results && browser.currentTest.results.testcases) {
            let object_first_key = Object.keys(browser.currentTest.results.testcases)[0]
            file_name = object_first_key
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
};