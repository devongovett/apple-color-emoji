const imageDirCDN = 'https://applemoji.vercel.app/'

// Get the image path for the given emoji string
export function getImage(str, imageDir = imageDirCDN) {
    return `${imageDir}${getEmojiCode(str)}.png`
}

// Detect native browser support for emoji
export function nativeSupport() {
    if (typeof document === 'undefined') return false
    const canvas = document.createElement('canvas')
    if (!canvas.getContext) return false
    const ctx = canvas.getContext('2d')
    ctx.textBaseline = 'top'
    ctx.font = '32px sans-serif'
    ctx.fillText('😃', 0, 0)
    return ctx.getImageData(16, 16, 1, 1).data[0] !== 0
}

export function getEmojiCode(str) {
    const emoji = str.replace(/[\ufe00-\ufe0f\u200d]/g, '')
    const name = []
    for (let i = 0; i < emoji.length; i++)
        name.push(('0000' + str.charCodeAt(i).toString(16)).slice(-4))
    return name.join('-')
}
