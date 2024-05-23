/**
 * @name BypassLinkWarning
 * @version 1.0.1
 * @description Automatically Click Visit Site on the Leaving Discord screen.
 * @source https://github.com/cssnr/browser-scripts
 * @updateUrl https://raw.githubusercontent.com/cssnr/browser-scripts/master/discord/BypassLinkWarning.plugin.js
 * @author Shane
 * @authorLink https://cssnr.github.io/
 */

module.exports = class BypassLinkWarning {
    constructor() {}

    load() {}

    start() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            processNode(node)
                        }
                    })
                }
            })
        })

        this.observe()
    }

    stop() {
        this.observer.disconnect()
    }

    observe() {
        const targetNode = document.body
        const config = { childList: true, subtree: true }

        this.observer.observe(targetNode, config)
    }
}

function processNode(node) {
    const button = node.querySelector('button[type="button"]')
    if (button?.textContent?.includes('Visit Site')) {
        button.click()
        const bg = document.querySelector('[class^="backdrop"]')
        if (bg) {
            setTimeout(() => {
                bg.click()
            }, 50)
        }
    }
}
