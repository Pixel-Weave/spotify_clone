console.log("Welcome to Spotify");
//Initialize variables
let songIndex = 1;
let nextIndex = 0;
let index = ['1','2','3','4','5','6','7','8','9','10'];
let audioElement = new Audio("./songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    {songName: "Cruel Summer", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpeg"},
    {songName: "As It Was", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpeg"},
    {songName: "We Don't Talk Anymore", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpeg"},
    {songName: "Closer", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg"},
    {songName: "Let Me Love You", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpeg"},
    {songName: "Shivers", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpeg"},
    {songName: "Wolves", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpeg"},
    {songName: "Attention", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpeg"},
    {songName: "Night Changes", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpeg"},
    {songName: "Save Your Tears", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpeg"},
] 

songItems.forEach((ele, i)=>{
    ele.getElementsByTagName("img")[0].src = songs[i].coverPath;
    ele.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

const checkSongTime = ()=>{
    const item = document.getElementById(songIndex);
    item.querySelector('span').innerText = audioElement.currentTime.toFixed(2);
}

const resetAllTime = ()=>{
    songItemPlay.forEach((ele)=>{
        ele.querySelector('span').innerText = '';
    })
}
//Adding Previous, Play/Pause, Next buttons
masterPlay.addEventListener('click', ()=>{
    var item = document.getElementById(songIndex);
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        item.classList.remove('fa-circle-play');
        item.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex-1].songName;
        setInterval(checkSongTime, 1000);
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
        masterSongName.innerText = '';
    }
    
})

//Listening to Events
audioElement.addEventListener("timeupdate", ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((ele)=>{
        ele.classList.remove('fa-circle-pause');
        ele.classList.add('fa-circle-play'); 
    })
}

songItemPlay.forEach((ele)=>{
    ele.addEventListener('click', (e)=>{
        songIndex = parseInt(e.target.id);
        makeAllPlays();
        if (!audioElement.played || songIndex != nextIndex) {
            audioElement.src = `./songs/${songIndex}.mp3`;
            resetAllTime();
        }
        if (audioElement.paused) {
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex-1].songName;
            setInterval(checkSongTime, 1000);
        }
        else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            masterSongName.innerText = '';
        }
        nextIndex = songIndex;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    resetAllTime();
    makeAllPlays();
    if (songIndex > 9) {
        songIndex = 1;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex-1].songName;
    index.forEach((ele)=>{
        if (songIndex == parseInt(ele)) {
            var itemPlay = document.getElementById(songIndex);
            itemPlay.classList.remove('fa-circle-play');
            itemPlay.classList.add('fa-circle-pause');
        }
    })
    nextIndex = songIndex;
    setInterval(checkSongTime, 1000);
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    resetAllTime();
    makeAllPlays();
    if (songIndex <= 1) {
        songIndex = 10;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex-1].songName;
    index.forEach((ele)=>{
        if (songIndex == parseInt(ele)) {
            var itemPlay = document.getElementById(songIndex);
            itemPlay.classList.remove('fa-circle-play');
            itemPlay.classList.add('fa-circle-pause');
        }
    })
    nextIndex = songIndex;
    setInterval(checkSongTime, 1000);
    gif.style.opacity = 1;
})

