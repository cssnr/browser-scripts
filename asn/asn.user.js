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
        const rows = document.getElementsByTagName('table')[0].children[0].rows
        let i = 4
        for (const tr of rows) {
            // if (tr.cells[0].tagName === 'TH') {
            //     for (const td of tr.cells) {
            //         if (td.textContent === 'fat.') {
            //             console.log(`fat. index: ${td.cellIndex}`)
            //             i = td.cellIndex
            //             break
            //         }
            //     }
            //     continue
            // }
            // if (!i) {
            //     break
            // }
            if (tr.cells[0].tagName === 'TH') {
                continue
            }
            console.log('Updating table now...')
            if (
                tr.cells[i] &&
                tr.cells[i].firstChild &&
                tr.cells[i].firstChild.data !== '0'
            ) {
                tr.style.backgroundColor = '#3d0000'
            }
        }
    },
    false
)
