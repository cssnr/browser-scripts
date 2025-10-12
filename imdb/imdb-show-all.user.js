// ==UserScript==
// @name           IMDb Auto Show All
// @description    Automatically show all titles for actors.
// @version        20250112
// @author         shane
// @namespace      https://github.com/cssnr/browser-scripts
// @updateURL      https://github.com/cssnr/browser-scripts/raw/master/imdb/imdb-show-all.user.js
// @downloadURL    https://github.com/cssnr/browser-scripts/raw/master/imdb/imdb-show-all.user.js
// @icon           https://imdb.com/favicon.ico
// @match          *://*.imdb.com/name/*
// @noframes
// ==/UserScript==

window.addEventListener('load', () => {
    const showMore = document.querySelector('.ipc-see-more__button')
    if (!showMore) return

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                observer.disconnect()
                console.info('Clicking See all...')
                showMore.click()
            }
        },
        { threshold: 1.0 }
    )

    observer.observe(showMore)
})
