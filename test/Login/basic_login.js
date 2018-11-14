let test_case_failure_collections = [];
var config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer:require("../../nightwatch").LIVE
}
var file_name;
console.log(config.url_pointer,"url_pointer")

module.exports = {
    'Basic Login With UserName And Password': function (client) {
        client.useXpath()
        client.url(config.url_pointer)
        client.waitForElementVisible(client.page.login().login_tag, 1000)
        client.click(client.page.login().login_tag, function (callback) {
            // this.verify.ok(false, "Title Present")
        })
        client.waitForElementVisible(client.page.login().email_tag, 1000)
        client.setValue(client.page.login().email_tag, "test@yahoo.com")
        client.keys(client.Keys.ENTER)
        client.waitForElementVisible(client.page.login().password_tag, 1000)
        client.setValue(client.page.login().password_tag, "123456")
        client.keys(client.Keys.ENTER)
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
        let con = config.slackWebHook;
        con["test"] = test_case_failure_collections;
        con["fileName"] = file_name
        con["url"] = config.url_pointer

        if (test_case_failure_collections.length > 0) {
            config.SlackNotification.sendFailureSlackNotification(con)
        } else {
            config.SlackNotification.sendSuccessSlackNotification(con)
        }
        done()
    }
};