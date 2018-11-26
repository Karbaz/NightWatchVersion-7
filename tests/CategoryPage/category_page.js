let test_case_failure_collections = [];
var page_config = {
    SlackNotification: require("../../global_imports").SlackNotification,
    slackWebHook: require("../../nightwatch").SLACK,
    url_pointer: require("../../nightwatch").LIVE,
    CATEGORY: require("../../category_urls").CATEGORY,
    seoSearchTextLogic: require("../../helper").seoSearchTextLogic,
    common_login: require("../../globals_path").common_login,
    common_logout: require("../../globals_path").common_logout,


}
var file_name;
var cheerio = require("cheerio")

let test_cases = {}

Object.keys(page_config.CATEGORY.Collections).map((value, index) => {
    let test_case_details = page_config.CATEGORY.Collections[value]
    var splitUrl = test_case_details.url.split("/")[test_case_details.url.split("/").length - 1];
    var breakLogic = splitUrl.split("-")
    var h1_value;

    let copy_test = Object.assign({
        [`${index} ${test_case_details.tag}`]: function (client) {
            client.url(test_case_details.url)
            client.waitForElementVisible("body", 1000)
            client.pause(9000)


            // client.getAttribute("meta[property='og:title']", "content", function (response) {
            //     if (!response.value) {
            //         this.verify.ok(false, "Title With EmptyString")
            //     } else {
            //         this.verify.ok(true, "Title Present")
            //         this.verify.ok(response.value.length > 40 ? true : false, "Title Grater Than 40 char")
            //         page_config.seoSearchTextLogic(client, response.value, breakLogic, function (error, logicResponse) {
            //             if (logicResponse.checkCounter > 0) {
            //                 client.verify.ok(true, "Urls Keys words match in meta title  " + test_case_details.url)
            //                 client.verify.ok(`Total Match Found ${logicResponse.checkCounter}`)
            //             } else {
            //                 client.verify.ok(false, "Urls Keys words not match in meta title " + test_case_details.url)
            //             }
            //         })
            //     }
            // })
            // client.getAttribute("meta[name=description]", "content", function (response) {
            //     if (!response.value) {
            //         this.verify.ok(false, "Description With Empty String")
            //     } else {
            //         this.verify.ok(true, "Description Present")
            //         this.verify.ok(response.value.length > 140 ? true : false, "Description Grater Than 40 char")
            //         page_config.seoSearchTextLogic(client, response.value, breakLogic, function (error, logicResponse) {
            //             if (logicResponse.checkCounter > 0) {
            //                 client.verify.ok(true, "Urls Keys words match in meta title " + test_case_details.url)
            //             } else {
            //                 client.verify.ok(false, "Urls Keys words not match in meta title " + test_case_details.url)
            //             }
            //         })
            //     }
            // })


            // client.verify.ElementCount("h1", 1)
            // client.verify.elementPresent("h1")
            // client.verify.BreadCrumb(3)
            // client.useXpath()
            // client.waitForElementVisible(client.page.category_page().filter, 1000)
            // client.waitForElementVisible(client.page.category_page().sort_by, 1000)
            // client.moveToElement(client.page.category_page().sort_by, 100, 100, function () {
            //     client.waitForElementVisible(client.page.category_page().sort_by, 500, function () {
            //         client.click(client.page.category_page().sort_by);

            //     }, "Click profile. ");
            // })


            // apply popular sort_by 
            client.waitForElementVisible(client.page.category_page().popular, 1000)
            client.moveToElement(client.page.category_page().popular, 100, 100, function () {
                client.waitForElementVisible(client.page.category_page().popular, 500, function () {
                    client.click(client.page.category_page().popular);

                }, "Click profile. ");
            })
            client.verify.elementNotPresent("//*[@id='404_page']");

            client.waitForElementVisible(client.page.category_page().new, 1000, function (callback) {
                if (callback.value) {
                    client.waitForElementVisible(client.page.category_page().new, 500, function () {
                        client.click(client.page.category_page().new);

                    }, "Click profile. ");
                }
            })
            client.verify.elementNotPresent("//*[@id='404_page']");




            client.waitForElementVisible(client.page.category_page().low_to_higt, 1000, function (callback) {
                if (callback.value) {
                    client.waitForElementVisible(client.page.category_page().low_to_higt, 500, function () {
                        client.click(client.page.category_page().low_to_higt);

                    }, "Click profile. ");
                }
            })
            client.verify.elementNotPresent("//*[@id='404_page']");


            client.waitForElementVisible(client.page.category_page().high_to_low, 1000, function (callback) {
                if (callback.value) {
                    client.waitForElementVisible(client.page.category_page().high_to_low, 500, function () {
                        client.click(client.page.category_page().high_to_low);

                    }, "Click profile. ");
                }
            })
            client.verify.elementNotPresent("//*[@id='404_page']");




            client.execute('scrollTo(0,30000)')

            client.useCss()
            client.getAttribute('h1', 'textContent', function (result) {
                result.value = result.value.replace("(", "=").replace(")", "").split("=");
                h1_value = parseInt(result.value[1] - 1)
                if (h1_value == '1' || h1_value == 1) {
                    client.verify.ok(false, "Only one product in this category")
                }
            });

            client.source(function (callback) {
                client.useXpath()
                client.waitForElementVisible(`//*[@id="p_${h1_value}"]`, 1000, function (callback) {
                    if (callback.value) {
                        client.verify.ok(true, "Product count match with display count")
                    } else {
                        client.verify.ok(false, "Fail to match product count with display count")
                    }
                })
                $ = cheerio.load(callback.value)
                var scripts = $("#product_wrapper img")
                scripts.map((index, val) => {
                    if (val.name === "img") {
                        this.verify.ok(val.attribs.title, `Title ${val.attribs.src}`)
                        this.verify.ok(val.attribs.src, `Src ${val.attribs.src}`)
                        this.verify.ok(val.attribs.alt, `Alt ${val.attribs.src}`)
                    }
                })
            })

            client.execute('scrollTo(0,0)')
            client.waitForElementVisible(client.page.category_page().collection_footer, 1000)
            client.waitForElementVisible(client.page.category_page().related_products, 1000)
            client.waitForElementVisible(client.page.category_page().filter_wrapper, 1000, function (callback) {})



            //color filter apply
            client.waitForElementVisible(client.page.category_page().color_filter_header, 1000, function (callback) {
                if (callback.value) {
                    client.waitForElementVisible(client.page.category_page().color_picker, 1000, function (colorPicker) {
                        if (!colorPicker.value) {
                            client.moveToElement(client.page.category_page().color_filter_header, 100, 100, function () {
                                client.waitForElementVisible(client.page.category_page().color_filter_header, 500, function () {
                                    client.click(client.page.category_page().color_filter_header);
                                    client.pause(1000)
                                    client.source(function (res) {
                                        $ = cheerio.load(res.value)
                                        var scripts = $("#desktop_color_picker ul>div>li")
                                        var colors;
                                        if (scripts["children"]()) {
                                            colors = scripts["children"]()
                                        }
                                        colors.map((v, i) => {
                                            client.useCss();
                                            if (i['parent'] && i['parent']['attribs'] && i['parent']['attribs']["id"]) {
                                                let id = "#" + i['parent']['attribs']["id"]
                                                client.click(id)
                                                client.pause(1000)
                                                var break_url = id.split("_")[id.split("_").length - 1]
                                                client.url(function (response) {
                                                    if (response.value.includes(break_url) > -1) {
                                                        this.verify.ok(true, "Color Found in url")
                                                    } else {
                                                        this.verify.ok(false, "Color not match in url")
                                                    }
                                                });
                                            }
                                        })
                                    })
                                }, "Click profile. ");
                            })
                            client.pause(3000)
                        } else {

                        }
                    })
                }
            })

            client.useXpath()
            client.waitForElementVisible(client.page.category_page().clear_filter, 1000, function (res) {
                if (res.value) {
                    client.moveToElement(client.page.category_page().clear_filter, 100, 100, function () {
                        client.waitForElementVisible(client.page.category_page().clear_filter, 500, function () {
                            client.click(client.page.category_page().clear_filter);
                        }, "Click profile. ");
                    })
                }
            })







            client.pause(2000)
            client.useCss()
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