// ==UserScript==
// @name           IMDb Auto Show All
// @description    Automatically show all titles for actors.
// @version        20231001
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/imdb-auto-show-all.js
// @match          *://*.imdb.com/name/*
// @noframes
// ==/UserScript==

'use strict'

// Wait for load
window.addEventListener(
    'load',
    function () {
        // generic selector for the first showMore button. Works for all types.
        let showMore = document.getElementsByClassName(
            'ipc-see-more__button'
        )[0]
        if (showMore) {
            console.log('Showing all now...')
            showMore.click()
        }
    },
    false
)
