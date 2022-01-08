const video = document.querySelector('#video');
const playBtn = document.querySelector('#playBtn');
const muteBtn = document.querySelector('#muteBtn');
const volumeRange = document.querySelector('#volumeRange');
const currentTime = document.querySelector('#currentTime');
const totalTime = document.querySelector('#totalTime');
const timeline = document.querySelector('#timeline');
const fullScreenBtn = document.querySelector('#fullScreenBtn');
const videoContainer = document.querySelector('#videoContainer');
const videoControls = document.querySelector('#videoControls');

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;

const handlePlayBtn = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtn.innerText = video.paused ? 'Play' : 'Stop';
};

const handleMuteBtn = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  muteBtn.innerText = video.muted ? 'Unmute' : 'Mute';
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = e => {
  const {
    target: { value },
  } = e;

  video.volume = value;
  volumeValue = value;
};

const formatTime = seconds =>
  new Date(seconds * 1000).toISOString().substring(11, 19);

const handleTimeUpdate = () => {
  const currentTime = Math.floor(video.currentTime);
  currentTime.innerText = formatTime(currentTime);
  timeline.value = currentTime;
};

const handleLoadedMetadata = () => {
  const wholeTime = Math.floor(video.duration);
  totalTime.innerText = formatTime(wholeTime);
  timeline.max = wholeTime;
};

const handleTimelineChange = e => {
  const {
    target: { value },
  } = e;

  video.currentTime = value;
};

const handleFullScreenBtn = () => {
  const fullscreen = document.fullscreenElement;

  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }

  fullScreenBtn.innerText = fullscreen
    ? 'Enter Full Screen'
    : 'Exit Full Screen';
};

const hideControls = () => videoControls.classList.remove('showing');

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }

  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }

  videoControls.classList.add('showing');
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;

  fetch(`/api/videos/${id}/view`, {
    method: 'POST',
  });
};

playBtn.addEventListener('click', handlePlayBtn);
muteBtn.addEventListener('click', handleMuteBtn);
volumeRange.addEventListener('input', handleVolumeChange);
video.addEventListener('timeupdate', handleTimeUpdate);
video.addEventListener('loadedmetadata', handleLoadedMetadata);
timeline.addEventListener('input', handleTimelineChange);
fullScreenBtn.addEventListener('click', handleFullScreenBtn);
video.addEventListener('mousemove', handleMouseMove);
video.addEventListener('mouseleave', handleMouseLeave);
video.addEventListener('ended', handleEnded);
