var cheerio = require("cheerio");
// var structured_urls = require("../tags_counter/urls");

ElementCount = function(selector,expression) {
    this.message = `Checking Element ${selector} count to be ${expression}`;

    this.expected = expression;

    this.pass = (value) => {
        return value === this.expected;
    };

    this.value = (result) => {
        return result;
    };

    this.command = (callback) => {
        return this.api.source(function(result){
            $ = cheerio.load(result.value)
            this.verify.equal($(selector).length,expression);
        });
    };
};

module.exports.assertion = ElementCount;