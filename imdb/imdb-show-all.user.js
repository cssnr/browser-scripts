// ==UserScript==
// @name           IMDb Auto Show All
// @description    Automatically show all titles for actors.
// @version        20240521
// @author         shane
// @namespace      https://github.com/cssnr/browser-scripts
// @updateURL      https://github.com/cssnr/browser-scripts/raw/master/imdb/imdb-show-all.user.js
// @downloadURL    https://github.com/cssnr/browser-scripts/raw/master/imdb/imdb-show-all.user.js
// @icon           https://imdb.com/favicon.ico
// @match          *://*.imdb.com/name/*
// @noframes
// ==/UserScript==

window.addEventListener('load', () => {
    let showMore = document.querySelector('.ipc-see-more__button')
    console.info('Activating See all...')
    showMore?.click()
})
