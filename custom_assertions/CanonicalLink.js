var cheerio = require("cheerio");
// var structured_urls = require("../structured_data/urls");

CanonicalLink = function (expression) {
    this.message = `Searching for Canonical Link in ${expression}`;

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
            var scripts = $("link")
            let valueCan;
            let check = false;
            scripts.map((index, value) => {
                valueCan = value;
                if (valueCan["attribs"]["rel"] == "canonical") {
                    if (expression == valueCan["attribs"]["href"]) {
                        check = true
                        this.verify.equal(expression, valueCan["attribs"]["href"])
                    }
                }
            })
            if (!check) {
                this.verify.ok(false, "Cannot Find The Canonical Link")
            }
        });
    };
};

module.exports.assertion = CanonicalLink;