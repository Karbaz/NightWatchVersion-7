let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    PRODUCT_PAGE: require("../../testing_url").PRODUCT_PAGE,
    common_login: require("../../globals_path").common_login,
    common_logout: require("../../globals_path").common_logout
}
var file_name;
var cheerio = require("cheerio")

let test_cases = {}

Object.keys(page_config.PRODUCT_PAGE).map((value, index) => {
    let test_case_details = page_config.PRODUCT_PAGE[value]
    let copy_test = Object.assign({
        [`${index} ${test_case_details.tag}`]: function (client) {
            client.url(test_case_details.url)
            client.useXpath()
            client.verify.elementNotPresent("//*[@id='404_page']");
            client.pause(1000)
            client.useCss()
            client.verify.ElementCount("h1", 1)
            client.verify.elementPresent("h1")
            client.useXpath()
            client.verify.elementPresent(client.page.product_page().price_tag);
            client.verify.elementPresent(client.page.product_page().size_guide);
            client.click(client.page.product_page().size_guide)
            client.waitForElementVisible(client.page.product_page().size_chart, 10000)
            client.click(client.page.product_page().size_chart_close)
            page_config.common_login(client)
            client.verify.elementPresent(client.page.product_page().inactive_wishlist)
            client.click(client.page.product_page().inactive_wishlist)
            let null_size = false;
            let before_zoom_selected_size;
            client.source(function (callback) {
                $ = cheerio.load(callback.value)
                var scripts = $("#size_block")
                for (let index = 0; index < scripts['0']['children'].length; index++) {
                    const element = scripts['0']['children'][index];
                    if (!element.attribs.class.match(/_disableSize/g)) {
                        console.log(element)
                        // null_size = true;
                        // client.useXpath();
                        // client.click('//*[@id=' + element.attribs.id + ']')
                        // before_zoom_selected_size = element
                        // break;
                    }
                }
                // if (!null_size) {
                //     client.verify.elementPresent(client.page.product_page().sold_out)
                // } else {
                //     client.click(client.page.product_page().add_to_bag)
                //     client.waitForElementVisible(client.page.product_page().cart_count, 10000)
                // }
            })
            // client.pause(500)
            // client.setValue(client.page.product_page().pincode, ["400050", client.Keys.ENTER])
            // client.waitForElementVisible(client.page.product_page().cod_summary, 10000)
            // client.url(test_case_details.url + "#zoom")
            // client.useCss()
            // client.waitForElementVisible("#zoom_sizes", 10000)
            // client.pause(2000)
            // client.source(function (callback) {
            //     $ = cheerio.load(callback.value)
            //     var scripts = $("#zoom_sizes")
            //     for (let index = 0; index < scripts['0']['children'].length; index++) {
            //         const element = scripts['0']['children'][index];
            //         if (!element.attribs.class.match(/_disableSize/g) && !element.attribs.class.match(/_activeSize/g)) {
            //             null_size = true;
            //             client.useXpath();
            //             client.click(client.page.product_page()["zoom_size" + index])
            //             before_zoom_selected_size = element
            //             break;
            //         }
            //     }
            //     if (!null_size) {
            //         client.verify.elementPresent(client.page.product_page().sold_out)
            //     } else {
            //         client.click(client.page.product_page().add_to_bag)
            //         client.waitForElementVisible(client.page.product_page().cart_count, 10000)
            //         client.click(client.page.product_page().zoom_add_to_bag)
            //         client.url(test_case_details.url)
            //     }
            // })
            // client.pause(5000)
            // page_config.common_logout(client)
            client.end();
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