'use strict';

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

// Targeting the progress Bar curentTime and Duration
const barCurrentTime = document.getElementById('current-time');
const barDuration = document.getElementById('duration');

// Targeting the Buttons
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Volume Control Bar
const vol = document.getElementById('volume-range');

// Music
const songs = [
  {
    name: 'Pray',
    displayName: 'Pray',
    artist: 'Dr.-Dolor-ft.-Teni-x-Phyno',
  },
  {
    name: 'Soco',
    displayName: 'Soco',
    artist: 'Wizkid Ft_Ceeza_Milli_Spotless_Terri',
  },
  {
    name: 'Surrender',
    displayName: 'Surrender-feat_-Simi',
    artist: 'Mr Eazi, Simi',
  },
  {
    name: 'On-The-Low',
    displayName: 'On The Low',
    artist: 'Burna Boy',
  },
  {
    name: 'My_Love',
    displayName: 'My Love',
    artist: 'Wale ft Wizkid',
  },
];

// Check if playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'pause');
  music.pause();
}

// Play or pause Event Listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  console.log(music.src);
  image.src = `img/${song.name}.jpeg`;
  console.log(image.src);
}

// current Song
let songIndex = 0;

// Previous
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// update Progress Bar and Time

function updateProgressBar(e) {
  if (isPlaying) {
    // console.log(e);
    const { duration, currentTime } = e.srcElement;

    // Update Progress Bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // To calculate the Duration for the progress Bar

    // Using Math,floor method to get the first number
    const durationMinutes = Math.floor(duration / 60);

    // To get the seconds using modulus to get the reminder
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      barDuration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Using Math,floor method to get the first number
    const currentMinutes = Math.floor(currentTime / 60);

    // To get the seconds using modulus to get the reminder
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    barCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar

function setProgressBar(e) {
  console.log(e);
  // // know the width of the progress Bar
  const width = this.clientWidth;
  // console.log('width', width);
  // to Know the width length that we click
  const clickX = e.offsetX;
  // console.log('clickX', clickX);

  // destructuring the music Object
  const { duration } = music;

  // To update the currentTime when we click anywhere on the Progress Time
  music.currentTime = (clickX / width) * duration;
}

// Set volume bar

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  music.volume = vol.value / 100;
  console.log(music.volume);
}
setVolume();

// Event Listeners
prevBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
vol.addEventListener('change', setVolume);

// Volume Event Listener

// Authomaticall play next Song
music.addEventListener('ended', nextSong);

music.addEventListener('timeupdate', updateProgressBar);

progressContainer.addEventListener('click', setProgressBar);
