function hasUserMedia() {
    return !!(navigator.mediaDevices.getUserMedia)
}

async function getMedia(constraints) {
    let stream = null;

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        const video = document.querySelector('video')
        video.srcObject = stream
    } catch(err) {
        const main = document.querySelector('main')
        const error = document.createElement('div')
        error.className = 'error'
        error.textContent = err
        main.appendChild(error)
    }
}

if (hasUserMedia) {
    getMedia({ video: true, audio: true })
}
