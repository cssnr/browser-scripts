// ==UserScript==
// @name           ASN Plus
// @description    ASN Plus Modifications
// @version        20231001
// @author         shane
// @icon           https://aviation-safety.net/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/asn.user.js
// @match          *://aviation-safety.net/*
// @noframes
// ==/UserScript==

'use strict'

// Wait for load
window.addEventListener(
    'load',
    function () {
        console.log('Updating table now...')
        const rows = document.getElementsByClassName('hp')[0].children[0].rows
        for (const tr of rows) {
            if (tr.cells[4].firstChild) {
                if (
                    tr.cells[4].firstChild.data !== '0' &&
                    tr.firstElementChild.tagName !== 'TH'
                ) {
                    tr.style.backgroundColor = '#3d0000'
                }
            }
        }
    },
    false
)
