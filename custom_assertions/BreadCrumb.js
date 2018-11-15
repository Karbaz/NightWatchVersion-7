var cheerio = require("cheerio");
// var structured_urls = require("../Breadcrumb/urls");

Breadcrumb = function (expression) {
    this.message = `Expected Number Of BreadCrumb ${expression}`;

    this.expected = expression;

    this.pass = (value) => {
        return value === this.expected;
    };

    this.value = (result) => {
        return result;
    };

    this.command = (callback) => {
        return this.api.source(function (result) {
            $ = cheerio.load(result.value)
            var scripts = $("#breadCrumb")
            let counter;
            if (scripts[0] && scripts[0]["children"]) {
                if (scripts[0]["children"].length) {
                    counter = scripts[0]["children"].length
                    this.verify.equal(counter, expression);
                } else {
                    this.verify.ok(false, "Cannot Find The Id")
                }
            } else {
                this.verify.ok(false, "Cannot Find The Id")
            }
        });
    };
};

module.exports.assertion = Breadcrumb;