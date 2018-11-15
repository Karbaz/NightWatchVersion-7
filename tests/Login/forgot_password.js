let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
}
var file_name;
module.exports = {
    '@tags': ['FORGOT PASSWORD'],
    'Forgot Password': function (client) {
        client.useXpath()
        client.url(page_config.url_pointer)

        client.waitForElementVisible(client.page.login().login_tag, 1000)
        client.click(client.page.login().login_tag, function (callback) {})

        client.waitForElementVisible(client.page.login().email_tag, 1000)
        client.setValue(client.page.login().email_tag, "test@yahoo.com")
        client.keys(client.Keys.ENTER)

        client.waitForElementVisible(client.page.login().forgot_password, 1000)
        client.click(client.page.login().forgot_password, function (callback) {})

        client.waitForElementVisible(client.page.login().forgot_password_username, 1000)
        client.setValue(client.page.login().forgot_password_username, "test@yahoo.com")
        client.click(client.page.login().forgot_password_submit, function (callback) {})

        client.waitForElementVisible(client.page.login().forgot_password_statement, 1000)

        client.waitForElementVisible(client.page.login().forgot_password_back, 1000)
        client.click(client.page.login().forgot_password_back)
        
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