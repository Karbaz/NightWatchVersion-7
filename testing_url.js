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

    "IMAGES_TITLE_ALT_TAG": {
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

    "STRUCTURE_DATA": {
        "product_page": {
            "url": `${page_config.LIVE}p/pine-green-boyfriend-t-shirt-for-women?src=collection`,
            "check": ["BreadcrumbList", "Organization", "Product"],
            "tag": "PRODUCT PAGE"
        },
        "category_page": {
            "url": `${page_config.LIVE}women-new-arrivals-collection`,
            "check": ["BreadcrumbList", "Organization"],
            "tag": "CATEGORY PAGE"
        },
        "mobile_page": {
            "url": `${page_config.LIVE}mobile-covers-india`,
            "check": ["BreadcrumbList", "Organization"],
            "tag": "MOBILE PAGE"
        },
        "mobile_brand_page": {
            "url": `${page_config.LIVE}mobile-covers-india/apple-cases-back-covers`,
            "check": ["BreadcrumbList", "Organization"],
            "tag": "MOBILE BRAND PAGE"
        },
        "all_pages": {
            "url": `${page_config.LIVE}`,
            "check": ["Organization"],
            "tag": "ALL PAGES"
        },
    },


    "BREADCRUMB": {
        "category_page": {
            "url": `${page_config.LIVE}cotm-collection`,
            "tag": "CHECKING FOR BreadCrumb",
            "nos_of_breadCrumb_tags": 2
        },
        "product_page": {
            "url": `${page_config.LIVE}p/pine-green-plain-mens-t-shirt?src=collection`,
            "tag": "CHECKING FOR BreadCrumb",
            "nos_of_breadCrumb_tags": 5
        }
    },


    "NEXT_AND_PREV_LINK": {
        "Link_1": {
            "url": `${page_config.LIVE}women-new-arrivals-collection`,
            "tag": "CHECKING FOR NEXT TAG",
            "testCase": ["next"]
        },
        "Link_2": {
            "url": `${page_config.LIVE}women-new-arrivals-collection/default/2`,
            "tag": "CHECKING FOR NEXT TAG",
            "testCase": ["prev", "next"]
        },
        "Link_3": {
            "url": `${page_config.LIVE}women-new-arrivals-collection/default/3`,
            "tag": "CHECKING FOR NEXT TAG",
            "testCase": ["prev"]
        }
    },

    "PRODUCT_PAGE": {
        1: {
            "url": `${page_config.LIVE}p/white-plain-mens-round-neck-t-shirt?src=collection`,
        }
    }

}