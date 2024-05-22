// ==UserScript==
// @name           IMDb Select Season Keyboard
// @description    Navigate episode seasons with number keys.
// @version        20240521
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts
// @match          *://*.imdb.com/title/*/episodes/*
// @noframes
// ==/UserScript==

const seasons = document.querySelectorAll('[data-testid="tab-season-entry"]')

// Listen for keydown events
window.addEventListener('keydown', function (event) {
    if (event.code.startsWith('Digit')) {
        const digit = event.code.replace('Digit', '')
        const idx = parseInt(digit) - 1
        if (idx < seasons.length) {
            console.info('Activating Episodes Number:', digit)
            seasons[idx].click()
        } else {
            console.warn('Season Not Found:', digit)
        }
    }
})
