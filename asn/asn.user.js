// ==UserScript==
// @name           ASN Plus
// @description    ASN Plus Modifications
// @version        20231201
// @author         shane
// @icon           https://aviation-safety.net/favicon.ico
// @namespace      https://github.com/cssnr/browser-scripts/
// @match          *://aviation-safety.net/*
// @noframes
// ==/UserScript==

window.addEventListener('load', () => {
    highlightTableRows()
    if (
        document.URL.includes('/wikibase/') ||
        document.URL.includes('/database/')
    ) {
        updateEntryTable()
        updateLastUpdated()
    }
})

function highlightTableRows() {
    console.log('Updating table rows now...')
    const rows = document.querySelector('table').rows
    for (const tr of rows) {
        if (!tr.rowIndex) {
            console.debug('skipping first row')
            continue
        }
        let fatal = tr.cells[4]?.textContent?.trim()
        if (fatal && fatal !== '0') {
            tr.style.backgroundColor = 'rgba(255,0,0,0.2)'
        }
    }
}

function updateEntryTable() {
    console.log('Updating entry table now...')
    const rows = document.querySelector('table').rows
    for (const tr of rows) {
        let rowType = tr.cells[0].textContent.toLowerCase()
        if (rowType.includes('registration')) {
            const reg = tr.cells[1].textContent.trim()
            if (reg) {
                console.debug(`reg: ${reg}`)
                tr.cells[1].innerHTML = `<span>${reg}</span>`
                if (reg.startsWith('N')) {
                    const faaUrl = `<a href='https://registry.faa.gov/AircraftInquiry/Search/NNumberResult?nNumberTxt=${reg}' target='_blank'>FAA</a>`
                    tr.cells[1].innerHTML += ` | ${faaUrl}`
                }
                const flightAware = `<a href='https://flightaware.com/resources/registration/${reg}' target='_blank'>FA</a>`
                const fr24 = `<a href='https://flightaware.com/resources/registration/${reg}' target='_blank'>FR24</a>`
                const jetPhotos = `<a href='https://www.jetphotos.com/registration/${reg}' target='_blank'>JetPhotos</a>`
                tr.cells[1].innerHTML += ` | ${flightAware} | ${fr24} | ${jetPhotos}`
            }
        }
        if (rowType.includes('operator')) {
            let oper = tr.cells[1].textContent.trim()
            const excludes = ['private', 'unreported']
            if (oper && !excludes.includes(oper.toLowerCase())) {
                console.debug(`oper: ${oper}`)
                oper = oper.replace(' ', '+')
                const operSearch = `<a href='https://aviation-safety.net/wikibase/dblist2.php?op=${oper}' target='_blank'>Wiki Search</a>`
                tr.cells[1].innerHTML += ` | ${operSearch}`
            }
        }
    }
}

function updateLastUpdated() {
    console.log('Updating last updated now...')
    // Add Edit Link
    const el = document.querySelector('.lastupdated')
    const id = parseInt(document.URL.split('/').at(-1).trim())
    if (isNaN(id)) {
        return
    }
    console.debug(`id: ${id}`)
    el.innerHTML = `<a href='https://aviation-safety.net/wikibase/web_db_edit.php?id=${id}'>Edit ${id}</a>`
    el.style.float = 'none'
    el.style.marginLeft = '40px'
    // el.style.color = 'white'

    // Add Updated Date
    const rows = document.querySelector('.updates').children[0].rows
    const updated = rows[rows.length - 1].firstChild.innerText.trim()
    const times = rows.length - 1
    console.debug(`updated: ${updated}`)
    el.innerHTML += ` - Updated <strong>${times}</strong> times, last <strong>${updated}</strong>`
}
