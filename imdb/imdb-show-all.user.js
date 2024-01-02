// ==UserScript==
// @name           IMDb Auto Show All
// @description    Automatically show all titles for actors.
// @version        20231201
// @author         shane
// @icon           https://imdb.com/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/
// @match          *://*.imdb.com/name/*
// @noframes
// ==/UserScript==

window.addEventListener('load', () => {
    let showMore = document.querySelector('.ipc-see-more__button')
    console.debug('showMore:', showMore)
    console.info('Activating See all now...')
    showMore?.click()
})
