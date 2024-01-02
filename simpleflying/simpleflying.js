// ==UserScript==
// @name           SimpleFlying Extras
// @description    Automatically delete unauthenicatedArticleLimitReached cookie.
// @version        20231201
// @author         shane
// @icon           https://simpleflying.com/public/build/images/favicon-48x48.8d7facc6.png
// @namespace      https://github.com/cssnr/browser-scripts/
// @match          *://*.simpleflying.com/*
// @noframes
// ==/UserScript==

window.addEventListener('load', () => {
    // console.log('document.cookie:', document.cookie)
    let cookies = document.cookie.split(';').map((item) => item.trim())
    console.debug('cookies:', cookies)
    for (const cookie of cookies) {
        // console.log('cookie:', cookie)
        let [name, value] = cookie.split(/=(.*)/s)
        // console.log(`${name}: ${value}`)
        if (name === 'unauthenicatedArticleLimitReached') {
            if (value === 'true') {
                document.cookie =
                    'unauthenicatedArticleLimitReached=false; path=/'
                console.log('Reset Article Limit')
            }
        } else if (name === 'articlesRead') {
            const decodedString = decodeURIComponent(value)
            const decodedObject = JSON.parse(decodedString)
            if (decodedObject?.visited_links?.length) {
                decodedObject.visited_links = []
                const jsonString = JSON.stringify(decodedObject)
                const encodedString = encodeURIComponent(jsonString)
                document.cookie = `articlesRead=${encodedString}; path=/`
                console.log('Clearing Visited Links')
            }
        }
    }
})
