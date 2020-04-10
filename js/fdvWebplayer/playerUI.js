


// LOAD SEQUENCE
function LoadSequence() {


	// Sequence URLs
	file4dsDesktop = 'assets/Sample4DViews_PresentingHOLOSYS_30fps_FILTERED_DESKTOP_STD.4ds';
	// file4dsMobile = this.dataset.mobileSequence;

	// audido url
	file4dsAudio = 'assets/Sample4DViews_PresentingHOLOSYS_audio.wav';



	if (!instance) {
		CreatePlayer();
		isAudiomuted = false;
	}
	else {
		console.log('CHANGE SEQUENCE sequence');
		DestroyPlayer(function () {

			CreatePlayer();
			isAudiomuted = false;


		});
	}
}

// MESH SEQUENCE LOADING PROGRESS

function ProgressWaiter() {
	var percent = meshesCache.length / maxCacheSize;

	console.error((percent * 100) + "%")
}

// Free memory on window loosing focus
window.onblur = function () {
	pauseSequence();
}

// Free memory on window closing
window.onunload = function () {
	DestroyPlayer();
}


var current_mode = screen.orientation;


setTimeout(() => {
	// destroy any 4dinstance if exists
	DestroyPlayer();

	// start loading sequence
	LoadSequence();
}, 1000);