module.exports = {
  'Demo test Google': function (client) {
    client
      .url('http://www.google.com')
      .waitForElementVisible('body', 1000)
      .assert.title('Google')
      .assert.visible('input[type=text]')
      .setValue('input[type=text]', 'rembrandt van rijn')
      .pause(1000)
      .end();
  },
  afterEach: function (browser, done) {
    console.log("After Each Call")
    done()
  },
};