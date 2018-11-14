var page_config = {
    LIVE: require("./nightwatch").LIVE
}

module.exports = {
    "TAG_COUNTER": {
        "product_page": {
            "url": `${page_config.LIVE}p/pine-green-boyfriend-t-shirt-for-women?src=collection`,
            "tag": "PRODUCT PAGE"
        },
        "category_page": {
            "url": `${page_config.LIVE}women-new-arrivals-collection`,
            "tag": "CATEGORY PAGE"
        },
        "mobile_page": {
            "url": `${page_config.LIVE}mobile-covers-india`,
            "tag": "MOBILE PAGE"
        },
        "mobile_brand_page": {
            "url": `${page_config.LIVE}mobile-covers-india/apple-cases-back-covers`,
            "tag": "MOBILE BRAND PAGE"
        },
        "all_pages": {
            "url": `${page_config.LIVE}`,
            "tag": "ALL PAGES"
        },

    },

    "CANONICAL": {
        "product_page": {
            "url": `${page_config.LIVE}p/pine-green-boyfriend-t-shirt-for-women?src=collection`,
            "tag": "PRODUCT PAGE",
            "CanonicalLink": "https://www.bewakoof.com/p/pine-green-boyfriend-t-shirt-for-women"
        },
        "category_page": {
            "url": `${page_config.LIVE}women-new-arrivals-collection`,
            "tag": "CATEGORY PAGE",
            "CanonicalLink": "https://www.bewakoof.com/women-new-arrivals-collection"
        },
        "color_of_the_month": {
            "url": `${page_config.LIVE}campaign/color-of-the-month`,
            "tag": "COLOR OF THE MONTH",
            "CanonicalLink": "https://www.bewakoof.com/campaign/color-of-the-month"
        },
        "home": {
            "url": `${page_config.LIVE}`,
            "tag": "BEWAKOOF HOME PAGE",
            "CanonicalLink": "https://www.bewakoof.com"
        },
    },

}