console.log("welcome to my music app..");

let songIndex = 0;
let audioElement = new Audio('songs/Justine Bieber - Let Me Love You.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById('gif');

let songs = [
    {songName: "Justine Bieber - Let Me Love You", filePath: "songs/Justine Bieber - Let Me Love You.mp3", coverPath: "covers/Justine-Bieber-Let-Me-Love-You.png"},
    {songName: "Coldplay - Hymn For The Weekend", filePath: "songs/Coldplay - Hymn For The Weekend.mp3", coverPath: "covers/Coldplay - Hymn For The Weekend.jpg"},
    {songName: "Ed Sheeran - Shape of You", filePath: "songs/Ed Sheeran - Shape of You.mp3", coverPath: "covers/Ed Sheeran - Shape of You.png"},
    {songName: "Home Free - Sea Shanty Medley", filePath: "songs/Home Free - Sea Shanty Medley.mp3", coverPath: "covers/Home Free - Sea Shanty Medley.jpg"},
    {songName: "Jason Derulo - Swalla feat. Nicki Minaj Ty Dolla", filePath: "songs/Jason Derulo - Swalla feat. Nicki Minaj Ty Dolla.mp3", coverPath: "covers/Jason Derulo - Swalla feat. Nicki Minaj Ty Dolla.jpg"},
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

// audioElement.play();

// Handle Play pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }
})


// listen to Events
audioElement.addEventListener('timeupdate' , ()=>{
    console.log('timeupdate')
    // update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlay();
        index = parseInt(e.target.id);
        namee = songs[index].songName;
        // console.log(namee);
        console.log(audioElement.src);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = 'songs/' + namee + '.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('backward').addEventListener('click', ()=>{
    if (songIndex > 0) {
        songIndex -= 1;
    } else {
        songIndex = songs.length - 1;
    }
    playSong(songIndex);
})

document.getElementById('forward').addEventListener('click', ()=>{
    if (songIndex < songs.length - 1) {
        songIndex += 1;
    } else {
        songIndex = 0;
    }
    playSong(songIndex);
})

const playSong = (index) => {
    audioElement.src = songs[index].filePath;
    songInfo.innerText = songs[index].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}