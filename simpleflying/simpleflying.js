// ==UserScript==
// @name           SimpleFlying Extras
// @description    Automatically delete unauthenicatedArticleLimitReached cookie.
// @version        20231101
// @author         shane
// @icon           https://simpleflying.com/public/build/images/favicon-48x48.8d7facc6.png
// @namespace      https://github.com/cssnr/browser-scripts/simpleflying-extras.js
// @match          *://*.simpleflying.com/*
// @noframes
// ==/UserScript==

'use strict'

window.addEventListener('load', () => {
    // console.log('document.cookie:', document.cookie)
    let cookies = document.cookie.split(';').map((item) => item.trim())
    console.log('cookies:', cookies)
    for (const cookie of cookies) {
        // console.log('cookie:', cookie)
        let [name, value] = cookie.split(/=(.*)/s)
        // console.log(`${name}: ${value}`)
        if (name === 'unauthenicatedArticleLimitReached') {
            if (value === 'true') {
                document.cookie = 'unauthenicatedArticleLimitReached=false'
                console.log('Reset Article Limit')
            }
        } else if (name === 'articlesRead') {
            const decodedString = decodeURIComponent(value)
            const decodedObject = JSON.parse(decodedString)
            console.log('articlesRead:', decodedObject)
            // decodedObject.visited_links = []
            const jsonString = JSON.stringify(decodedObject)
            const encodedString = encodeURIComponent(jsonString)
            console.log('encodedString:', encodedString)
            document.cookie = `articlesRead=${encodedString}`
            console.log('Reset Visited Links')
        }
    }
})
