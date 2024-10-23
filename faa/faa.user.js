// ==UserScript==
// @name        FAA Registration Enhancements
// @description Update FAA Registration Results Page
// @version     20240522
// @author      shane
// @namespace   https://github.com/cssnr/browser-scripts
// @updateURL   https://github.com/cssnr/browser-scripts/raw/master/faa/faa.user.js
// @downloadURL https://github.com/cssnr/browser-scripts/raw/master/faa/faa.user.js
// @icon        https://registry.faa.gov/AircraftInquiry/images/favicon.ico
// @match       https://registry.faa.gov/AircraftInquiry/Search/NNumberResult*
// ==/UserScript==

window.addEventListener('load', () => {
    let element = document.querySelector(
        '[data-label="Mode S Code (Base 16 / Hex)"]'
    )
    if (element) {
        const hex = element.textContent
        const link = document.createElement('a')
        link.href = `https://globe.adsbexchange.com/?icao=${hex}`
        link.textContent = hex
        link.target = '_blank'
        element.textContent = ''
        element.appendChild(link)
    }
})
