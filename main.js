"use strict"
function hasUserMedia() {
	return !!(
		navigator.mediaDevices.getUserMedia &&
		navigator.mediaDevices.getDisplayMedia
	)
}

function renderMedia(stream) {
	const video = document.querySelector('video')
	video.srcObject = stream
}

function DisplayError(message) {
	const main = document.querySelector('main')
	const error = document.createElement('div')
	error.className = 'error'
	error.textContent = message
	main.appendChild(error)
}

async function getMedia(constraints) {
	const { getUserMedia } = navigator.mediaDevices
	console.log(getUserMedia)
	let stream = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia(constraints)
		renderMedia(stream)
	} catch(err) {
		new DisplayError(err)
	}
}

async function getCapture(constraints) {
	let stream = null;

	try {
		stream = await navigator.mediaDevices.getDisplayMedia(constraints)
		renderMedia(stream)
	} catch(err) {
		new DisplayError(err)
	}
}

if (hasUserMedia) {
	const camConfig = {
		video: {
			width: { ideal: 1280 },
			height: { ideal: 720 }
		},
		audio: true
	}
	const screenConfig = {
		video: {
			cursor: 'always'
		},
		audio: {
			echoCancellation: true,
			noiseSuppression: true,
			sampleRate: 44100
		}
	}
	getMedia(camConfig)
	const startBtn = document.querySelector('#capture')
	startBtn.addEventListener('click', () => getCapture(screenConfig), false)
}
