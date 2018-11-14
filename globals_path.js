module.exports = {
    apiUrl: "https://localhost:4000/",
    abortOnAssertionFailure: false,
    getApiUrlFromTerminal: function (args) {
        return "https://localhost:4000/"
    },
    slackWebHook: function (args) {
        return {
            web_hook: "https://hooks.slack.com/services/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"
        }
    },
    common_login: function (client, username, password) {
        return client.waitForElementVisible(client.page.login().login_tag, 1000).
        click(client.page.login().login_tag, function (callback) {
            // this.verify.ok(false, "Title Present")
        }).
        waitForElementVisible(client.page.login().email_tag, 1000).
        setValue(client.page.login().email_tag, username ? username : "test@yahoo.com").
        keys(client.Keys.ENTER).
        waitForElementVisible(client.page.login().password_tag, 1000).
        setValue(client.page.login().password_tag, password ? password : "123456").
        keys(client.Keys.ENTER)
    },

    common_logout: function (client) {
        return client.waitForElementVisible(client.page.login().profile_icon, 1000)
            .pause(500)
            .moveToElement(client.page.login().profile_icon, 100, 100, function () {
                client.waitForElementVisible(client.page.login().profile_icon, 500, function () {
                    client.click(client.page.login().profile_icon);
                }, "Click profile. ");
            })
            .pause(500)
            .waitForElementVisible(client.page.login().profile_logout, 500, function (res) {
                if (!res.value) {
                    this.verify.ok(false, `Element not Found   ( ${client.page.login().profile_logout} )   `)
                } else {
                    client.click(client.page.login().profile_logout)
                }
            }, "Click Logout")
    }
}