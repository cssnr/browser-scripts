// ==UserScript==
// @name           IMDb Title Prev-Next Key
// @description    Navigate episode previous and next with arrow keys.
// @version        20231001
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/imdb-title-prev-next.js
// @match          *://*.imdb.com/title/*
// @noframes
// ==/UserScript==

'use strict'

function clickEl(element) {
    if (element) {
        console.log(`Clicking ${element.title}`)
        element.click()
    }
}

// Listen for keydown events
window.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        const el = document.querySelectorAll(
            "[data-testid='hero-subnav-bar-previous-episode-button']"
        )[0]
        clickEl(el)
    } else if (event.key === 'ArrowRight') {
        const el = document.querySelectorAll(
            "[data-testid='hero-subnav-bar-next-episode-button']"
        )[0]
        clickEl(el)
    }
})
