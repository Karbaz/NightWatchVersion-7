module.exports = {
  'Demo test Google': function (client) {
    console.log(",,,", client.page.index().a)
    client
      .url(client.globals.getApiUrlFromTerminal())
      .waitForElementVisible('body', 1000)
      .pause(5000)
      .end();
  },
  afterEach: function (browser, done) {
    console.log("After Each Call")
    done()
  },
};