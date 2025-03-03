const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const fileInput = document.getElementById('fileInput');
const playlist = document.getElementById('playlist');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let audioFiles = [];
let currentIndex = 0;

// Play audio
playButton.addEventListener('click', () => {
    audio.play();
});

// Pause audio
pauseButton.addEventListener('click', () => {
    audio.pause();
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
});

// Seek audio
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Change volume
volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

// Load multiple audio files
fileInput.addEventListener('change', (event) => {
    audioFiles = Array.from(event.target.files);
    playlist.innerHTML = '';
    audioFiles.forEach((file, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        listItem.style.cursor = 'pointer';
        listItem.addEventListener('click', () => playAudio(index));
        playlist.appendChild(listItem);
    });
});

// Play selected audio file
function playAudio(index) {
    if (index >= 0 && index < audioFiles.length) {
        currentIndex = index;
        const file = audioFiles[index];
        const objectURL = URL.createObjectURL(file);
        audio.src = objectURL;
        audio.play();
    }
}

// Play next track
nextButton.addEventListener('click', () => {
    if (currentIndex < audioFiles.length - 1) {
        playAudio(currentIndex + 1);
    }
});

// Play previous track
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        playAudio(currentIndex - 1);
    }
});

// Auto-play next song when current ends
audio.addEventListener('ended', () => {
    if (currentIndex < audioFiles.length - 1) {
        playAudio(currentIndex + 1);
    }
});
