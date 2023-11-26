// ==UserScript==
// @name            SMWC World
// @description     Patch or Play ROMs.
// @version         20231101
// @author          shane
// @icon            https://dev.smwc.world/static/images/favicon.ico
// @namespace       https://github.com/cssnr/browser-scripts/smwc.js
// @match           *://*.smwcentral.net/*
// @require         https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @noframes
// ==/UserScript==

'use strict'

window.addEventListener('load', addLinks, false)

const observer = new MutationObserver(onMutate)
observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
})

function onMutate(mutationList) {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            // console.log(mutation.addedNodes, mutation.removedNodes, mutation.target)
            const node = mutation.addedNodes[0]
            if (!(node?.nodeName === 'A' && node.href.includes('smwc.world'))) {
                updateDom()
            }
        }
    }
}

function updateDom() {
    let el = $('.download-section')[0]
    if (el) {
        // Detail Page - Add Download Button
        const first = el.children[0]
        if (!first?.href?.includes('smwc.world')) {
            console.log('Adding Patch Button')
            $('<a>', {
                text: 'Patch',
                target: '_blank',
                class: 'button action',
                href: `https://dev.smwc.world/patcher/?patch=${first.href}`,
            }).prependTo(el)
        }
    } else {
        // Other Pages - Check for Links to Add
        addLinks()
    }
}

function addLinks() {
    const elements = $('td > a:parent')
    // console.log('addLinks:', elements)
    elements.each(function () {
        const el = $(this)[0]
        if (el.textContent === 'Download') {
            const td = el.parentElement
            // console.log('td:', td, td.children[0])
            if (!td?.children[0]?.href?.includes('smwc.world')) {
                console.log(`Adding link: ${el.href}`)
                $('<a>', {
                    text: 'Patch',
                    target: '_blank',
                    href: `https://dev.smwc.world/patcher/?patch=${el.href}`,
                }).prependTo(td)
            }
        }
    })
}
