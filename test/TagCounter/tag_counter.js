let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    TAG_COUNTER: require("../../testing_url").TAG_COUNTER
}
var file_name;

let test_cases = {}

Object.keys(page_config.TAG_COUNTER).map((value, index) => {
    let test_case_details = page_config.TAG_COUNTER[value]
    let copy_test = Object.assign({
        [`${index}`]: function (client) {
            client.url(test_case_details.url)
            client.waitForElementVisible("body", 1000)
            client.pause(2000)
            client.verify.ElementCount("h1", 1)
            client.verify.elementPresent("h1")
            client.end();
        }
    }, test_cases)
    test_cases = copy_test;
})


module.exports = test_cases