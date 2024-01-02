// ==UserScript==
// @name           IMDb Title Prev-Next Key
// @description    Navigate episode previous and next with arrow keys.
// @version        20231201
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/
// @match          *://*.imdb.com/title/*
// @noframes
// ==/UserScript==

const prevEl = document.querySelector(
    "[data-testid='hero-subnav-bar-previous-episode-button']"
)
const nextEl = document.querySelector(
    "[data-testid='hero-subnav-bar-next-episode-button']"
)

// Listen for keydown events
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        console.info('Activating Next all now...')
        prevEl?.click()
    } else if (event.key === 'ArrowRight') {
        console.info('Activating Previous all now...')
        nextEl?.click()
    }
})
