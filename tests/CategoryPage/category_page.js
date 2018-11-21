let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    CATEGORY: require("../../category_urls").CATEGORY,
    seoSearchTextLogic: require("../../helper").seoSearchTextLogic
}
var file_name;
var cheerio = require("cheerio")

let test_cases = {}

Object.keys(page_config.CATEGORY.Collections).map((value, index) => {
    let test_case_details = page_config.CATEGORY.Collections[value]
    var splitUrl = test_case_details.url.split("/")[test_case_details.url.split("/").length - 1];
    var breakLogic = splitUrl.split("-")

    let copy_test = Object.assign({
        [`${index} ${test_case_details.tag}`]: function (client) {
            client.url(test_case_details.url)
            client.waitForElementVisible("body", 1000)
            client.pause(5000)
            client.getAttribute("meta[property='og:title']", "content", function (response) {
                if (!response.value) {
                    this.verify.ok(false, "Title With EmptyString")
                } else {
                    this.verify.ok(true, "Title Present")
                    this.verify.ok(response.value.length > 40 ? true : false, "Title Grater Than 40 char")
                    page_config.seoSearchTextLogic(client, response.value, breakLogic, function (error, logicResponse) {
                        if (logicResponse.checkCounter > 0) {
                            client.verify.ok(true, "Urls Keys words match in meta title  " + test_case_details.url)
                            client.verify.ok(`Total Match Found ${logicResponse.checkCounter}`)
                        } else {
                            client.verify.ok(false, "Urls Keys words not match in meta title " + test_case_details.url)
                        }
                    })
                }
            })
            client.getAttribute("meta[name=description]", "content", function (response) {
                if (!response.value) {
                    this.verify.ok(false, "Description With Empty String")
                } else {
                    this.verify.ok(true, "Description Present")
                    this.verify.ok(response.value.length > 140 ? true : false, "Description Grater Than 40 char")
                    page_config.seoSearchTextLogic(client, response.value, breakLogic, function (error, logicResponse) {
                        if (logicResponse.checkCounter > 0) {
                            client.verify.ok(true, "Urls Keys words match in meta title " + test_case_details.url)
                        } else {
                            client.verify.ok(false, "Urls Keys words not match in meta title " + test_case_details.url)
                        }
                    })
                }
            })
            

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