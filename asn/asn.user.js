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

function highlightTableRows() {
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
            tr.cells[i].firstChild?.data !== '0'
        ) {
            tr.style.backgroundColor = 'rgba(255,0,0,0.2)'
        }
    }
}

function updateEntryTable() {
    const rows = document.getElementsByTagName('table')[0].children[0].rows
    for (const tr of rows) {
        if (tr.innerHTML.includes('Registration:')) {
            const reg = tr.cells[1].textContent.trim()
            if (reg) {
                console.log(`reg: ${reg}`)
                tr.cells[1].innerHTML = `<span>${reg}</span>`
                if (reg.startsWith('N')) {
                    const faaUrl = `<a href='https://registry.faa.gov/AircraftInquiry/Search/NNumberResult?nNumberTxt=${reg}' target='_blank'>FAA</a>`
                    tr.cells[1].innerHTML += `| ${faaUrl}`
                }
                const flightAware = `<a href='https://flightaware.com/resources/registration/${reg}' target='_blank'>FA</a>`
                const fr24 = `<a href='https://flightaware.com/resources/registration/${reg}' target='_blank'>FR24</a>`
                const jetPhotos = `<a href='https://www.jetphotos.com/registration/${reg}' target='_blank'>JetPhotos</a>`
                tr.cells[1].innerHTML += ` | ${flightAware} | ${fr24} | ${jetPhotos}`
            }
        }
    }
}

function updateLastUpdated() {
    // Add Edit Link
    const el = document.getElementsByClassName('lastupdated')[0]
    const id = document.URL.split('/').at(-1).trim()
    if (isNaN(id)) {
        return
    }
    console.log(`id: ${id}`)
    el.innerHTML = `<a href='https://aviation-safety.net/wikibase/web_db_edit.php?id=${id}'>Edit ${id}</a>`
    el.style.float = 'none'
    el.style.marginLeft = '40px'
    // Add Updated Date
    const rows = document.getElementsByClassName('updates')[0].children[0].rows
    const updated = rows[rows.length - 1].firstChild.innerText.trim()
    const times = rows.length - 1
    console.log(`updated: ${updated}`)
    el.innerHTML += ` - Updated <strong>${times}</strong> times on <strong>${updated}</strong>`
}

// Wait for load
window.addEventListener(
    'load',
    function () {
        highlightTableRows()
        if (document.URL.includes('aviation-safety.net/wikibase/')) {
            updateEntryTable()
            updateLastUpdated()
        }
    },
    false
)
