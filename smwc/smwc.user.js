// ==UserScript==
// @name           SMWC World
// @description    Patch or Play ROMs.
// @version        20241023
// @author         shane
// @namespace      https://github.com/cssnr/browser-scripts
// @updateURL      https://github.com/cssnr/browser-scripts/raw/master/smwc/smwc.user.js
// @downloadURL    https://github.com/cssnr/browser-scripts/raw/master/smwc/smwc.user.js
// @icon           https://dev.smwc.world/static/images/favicon.ico
// @match          *://*.smwcentral.net/*
// @require        https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @noframes
// ==/UserScript==

window.addEventListener('load', onLoad, false)

function onLoad() {
    const observer = new MutationObserver(onMutate)
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    })
}
function onMutate(mutationList) {
    // console.debug('onMutate')
    for (const mutation of mutationList) {
        console.debug(`mutation.type: ${mutation.type}`)
        // if (mutation.type === 'childList') {}
        // console.debug(mutation.addedNodes, mutation.removedNodes, mutation.target)
        const node = mutation.addedNodes[0]
        // console.debug(`node?.nodeName: ${node?.nodeName}`)
        if (!(node?.nodeName === 'A' && node.href.includes('smwc.world'))) {
            updateDom()
        }
    }
}

function updateDom() {
    console.debug('updateDom')
    if (window.location.search.includes('s=smwhacks')) {
        addLinks()
    } else if (window.location.search.includes('a=details')) {
        const section = $('.top-line a').text()
        if (section === 'Super Mario World Hacks') {
            addPatchBtn()
        }
    }
}

function addPatchBtn() {
    console.debug('addPatchBtn')
    if (!window.location.search.includes('a=details')) {
        return
    }
    const section = document.querySelector('.top-line a').textContent
    if (section !== 'Super Mario World Hacks') {
        return
    }
    const div = $('.download-section')
    const anchor = div.find('a')
    if (anchor?.text() === 'Download') {
        console.log('Adding Patch Button')
        $('<a>', {
            text: 'Patch',
            target: '_blank',
            class: 'button action',
            href: `https://dev.smwc.world/patcher/?patch=${anchor.href}`,
        }).prependTo(div)
    }
}

function addLinks() {
    if (!window.location.search.includes('s=smwhacks')) {
        return
    }
    // const elements = $('td > a:parent')
    // console.debug('elements:', elements)
    const rows = $('tbody > tr')
    console.debug('rows:', rows)
    rows.each(function () {
        if (!this.dataset.linkAdded) {
            const td = this.cells[this.cells.length - 1]
            let link = $(td).find('a')
            console.debug(`Adding Patch Link: ${link.href}`)
            $('<a>', {
                text: 'Patch',
                target: '_blank',
                href: `https://dev.smwc.world/patcher/?patch=${link.href}`,
            }).prependTo(td)
            this.dataset.linkAdded = 'yes'
        }
    })
}
