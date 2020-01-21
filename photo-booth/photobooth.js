function hasUserMedia() {
	return !!(
		navigator.mediaDevices.getUserMedia &&
		navigator.mediaDevices.getDisplayMedia
	)
}

function DisplayError(message) {
	const main = document.querySelector('body')
	const error = document.createElement('div')
	error.className = 'error'
	error.textContent = message
	main.appendChild(error)
}

function initializeMedia(stream) {
	let streaming = false;
	const video = document.querySelector('video')
	const canvas = document.querySelector('canvas')
	video.srcObject = stream
	streaming = true
	const filters = ['', 'grayscale', 'sepia', 'invert']
	let currentFilter = 0
	document.querySelector('video').addEventListener('click',
		function(e) {
			if (streaming) {
				canvas.width = video.clientWidth
				canvas.height = video.clientHeight
				const ctx = canvas.getContext('2d')
				ctx.drawImage(video, 0, 0)
				currentFilter++
				if(currentFilter > filters.length -1) currentFilter = 0
				canvas.className = filters[currentFilter]
			}
		}
	)
}


async function getMedia(constraints) {
	const { getUserMedia } = navigator.mediaDevices
	let stream = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia(constraints)
		initializeMedia(stream)
	} catch(err) {
		new DisplayError(err)
	}
}

if (hasUserMedia) {
	getMedia({ video: true, audio: false })
} else {
	alert("Your browser lacks the required features")
}

