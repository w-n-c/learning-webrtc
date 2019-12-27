function hasUserMedia() {
	return !!(navigator.mediaDevices.getUserMedia)
}

function renderMedia(stream) {
	const video = document.querySelector('video')
	video.srcObject = stream
}

function DisplayError(message) {
	const main = document.querySelector('main')
	const error = document.createElement('div')
	error.className = 'error'
	error.textContent = err
	main.appendChild(error)
}

async function getMedia(constraints) {
	let stream = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia(constraints)
		renderMedia(stream)
	} catch(err) {
		new DisplayError(err)
	}
}

if (hasUserMedia) {
	getMedia({ video: true, audio: true })
}
