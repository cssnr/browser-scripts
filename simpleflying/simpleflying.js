// ==UserScript==
// @name           SimpleFlying Extras
// @description    Automatically delete unauthenicatedArticleLimitReached cookie.
// @version        20231101
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/simpleflying-extras.js
// @match          *://*.simpleflying.com/*
// @noframes
// ==/UserScript==

'use strict'

// Wait for load
window.addEventListener(
    'load',
    function () {
        //--- Loop through cookies and delete them.
        const cookieList = document.cookie.split(/;\s*/)
        console.log('cookieList:', cookieList)

        for (let J = cookieList.length - 1; J >= 0; --J) {
            const cookieName = cookieList[J].replace(/\s*(\w+)=.+$/, '$1')
            console.log('cookieName:', cookieName)
            // eraseCookie(cookieName)
            if (cookieName === 'unauthenicatedArticleLimitReached') {
                console.log(`Deleting Cookie: ${cookieName}`)
            }
        }

        console.log('cookieList:', cookieList)
    },
    false
)

// function eraseCookie(cookieName) {
//     //--- ONE-TIME INITS:
//     //--- Set possible domains. Omits some rare edge cases.?.
//     var domain = document.domain
//     var domain2 = document.domain.replace(/^www\./, '')
//     var domain3 = document.domain.replace(/^(\w+\.)+?(\w+\.\w+)$/, '$2')
//
//     //--- Get possible paths for the current page:
//     var pathNodes = location.pathname.split('/').map(function (pathWord) {
//         return '/' + pathWord
//     })
//     var cookPaths = [''].concat(
//         pathNodes.map(function (pathNode) {
//             if (this.pathStr) {
//                 this.pathStr += pathNode
//             } else {
//                 this.pathStr = '; path='
//                 return this.pathStr + pathNode
//             }
//             return this.pathStr
//         })
//     )
//
//     ;(eraseCookie = function (cookieName) {
//         //--- For each path, attempt to delete the cookie.
//         cookPaths.forEach(function (pathStr) {
//             //--- To delete a cookie, set its expiration date to a past value.
//             document.cookie =
//                 cookieName +
//                 '=' +
//                 pathStr +
//                 '; expires=Thu, 01-Jan-1970 00:00:01 GMT;'
//             document.cookie =
//                 cookieName +
//                 '=' +
//                 pathStr +
//                 '; domain=' +
//                 domain +
//                 '; expires=Thu, 01-Jan-1970 00:00:01 GMT;'
//             document.cookie =
//                 cookieName +
//                 '=' +
//                 pathStr +
//                 '; domain=' +
//                 domain2 +
//                 '; expires=Thu, 01-Jan-1970 00:00:01 GMT;'
//             document.cookie =
//                 cookieName +
//                 '=' +
//                 pathStr +
//                 '; domain=' +
//                 domain3 +
//                 '; expires=Thu, 01-Jan-1970 00:00:01 GMT;'
//         })
//     })(cookieName)
// }
