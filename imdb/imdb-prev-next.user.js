// ==UserScript==
// @name           IMDb Title Prev-Next Key
// @description    Navigate episode previous and next with arrow keys.
// @version        20240521
// @author         shane
// @namespace      https://github.com/cssnr/browser-scripts
// @updateURL      https://github.com/cssnr/browser-scripts/raw/master/imdb/imdb-prev-next.user.js
// @downloadURL    https://github.com/cssnr/browser-scripts/raw/master/imdb/imdb-prev-next.user.js
// @icon           https://imdb.com/favicon.ico
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
        // console.info('Activating Next...')
        prevEl?.click()
    } else if (event.key === 'ArrowRight') {
        // console.info('Activating Previous...')
        nextEl?.click()
    } else if (event.code === 'KeyE') {
        // console.info('Activating Episodes...')
        document.querySelector('.episode-guide-text')?.click()
    }
})
