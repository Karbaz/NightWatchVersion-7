var page_config={
    LIVE:require("./nightwatch").LIVE
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
}