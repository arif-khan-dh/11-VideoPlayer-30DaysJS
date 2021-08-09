// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const btnFullScreen = player.querySelector('#fullscreen');
const volumeIcon = player.querySelector('.volume .svg-wrapper');
const playbackIcon = player.querySelector('.playback .svg-wrapper');


// Build out functions

function togglePLay() {
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
    video[video.paused ? 'play' : 'pause']();
    // if(video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}
function handleProgress() {
    const percent =  (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = e.layerX / progress.offsetWidth;
    video.currentTime = scrubTime * video.duration;
    console.log(e);
}

let isFullscreen = false;
function openFullScreen(e) {    
    if(!isFullscreen) {
        player.requestFullscreen();        
    } else {
        document.exitFullscreen();
    }
    isFullscreen = !isFullscreen;
}


let isControlVisible = false;
function toggleVolumeVisibility(e) {
    if(!isControlVisible) {
        volumeIcon.classList.add('visible');
        isControlVisible = true;
    } else if(!volumeIcon.classList.contains('visible')) {
        hideControls();
        volumeIcon.classList.add('visible');    
        isControlVisible = true;    
    } else {
        hideControls();
    }
    e.stopPropagation()
}

function propagateEvent(e) {
    if(e.target !== volumeIcon && e.target !== playbackIcon) {
        hideControls();
        isControlVisible = !isControlVisible;
    }
}

function togglePlaybackVisibility(e) {    
    if(!isControlVisible) {
        playbackIcon.classList.add('visible');
        isControlVisible = true;
    } else if(!playbackIcon.classList.contains('visible')) {
        hideControls();
        playbackIcon.classList.add('visible');    
        isControlVisible = true;    
    } else {
        hideControls();
    }    
    e.stopPropagation();
}

function hideControls() {
    if(playbackIcon.classList.contains('visible')) {
        playbackIcon.classList.remove('visible');
    }
    if(volumeIcon.classList.contains('visible')) {
        volumeIcon.classList.remove('visible');
    }
    isControlVisible = false;
}


// Hook up the event listeners

player.addEventListener('click', (e) => isControlVisible && propagateEvent(e));

video.addEventListener('click', togglePLay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', openFullScreen);

toggle.addEventListener('click', togglePLay);
skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
});

let mouseDown = false;
progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
btnFullScreen.addEventListener('click', openFullScreen);
volumeIcon.addEventListener('click', toggleVolumeVisibility);
playbackIcon.addEventListener('click', togglePlaybackVisibility);

// progress.addEventListener('mousemove', (e) =>{ 
//     if(mouseDown) scrub(e);
//     // console.log(this);
// });

// progress.addEventListener('mousedown', (e) => {
//     mouseDown = true;
//     console.log(e);
// });
// progress.addEventListener('mouseup', (e) => {
//     mouseDown = false;
//     console.log(e);
// });