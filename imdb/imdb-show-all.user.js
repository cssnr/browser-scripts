// ==UserScript==
// @name           IMDb Auto Show All
// @description    Automatically show all titles for actors.
// @version        20240521
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/
// @match          *://*.imdb.com/name/*
// @noframes
// ==/UserScript==

window.addEventListener('load', () => {
    let showMore = document.querySelector('.ipc-see-more__button')
    console.info('Activating See all...')
    showMore?.click()
})
