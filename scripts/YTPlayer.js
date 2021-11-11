var player, progressTimer;
var playlist = [];
const inputProgress = document.getElementById("progress");
const btnPlay = document.getElementById("btn-play");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const inputVolume = document.getElementById("volume");
const tooltipVolume = document.querySelector(".volume-tooltip");
loadSettings();
inputBackground(inputProgress);
inputBackground(inputVolume);
setToolTipValue(inputVolume, tooltipVolume);

function onYouTubeIframeAPIReady() {
    player = new YT.Player("YTPlayer", {
        width: "320",
        height: "180",
        playerVars: {
            autoplay: 1,
            controls: 0,
            iv_load_policy: 3,
            rel: 0,
            showinfo: 0,
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(eve) {
    if (playlist.length > 0) {
        eve.target.loadVideoById(playlist[0]);
        eve.target.seekTo(0);
        eve.target.playVideo();
        updateList();
    }
    eve.target.setVolume(inputVolume.valueAsNumber);
}

function onPlayerStateChange(eve) {
    if (eve.data == YT.PlayerState.PLAYING) {
        progressTimer = setInterval(() => {
            inputProgress.value =
                (player.getCurrentTime() / player.getDuration()) *
                inputProgress.max;
            inputBackground(inputProgress);
            updateTime();
        }, 100);
        btnPlay.firstElementChild.className = "pause";
    } else {
        btnPlay.firstElementChild.className = "play";
        window.clearInterval(progressTimer);
    }
    if (eve.data == YT.PlayerState.ENDED) {
        playlist.shift();
        saveSettings();
        if (playlist.length > 0) {
            player.loadVideoById(playlist[0]);
            updateList();
        } else {
            player.stopVideo();
            player.clearVideo();
        }
    }
}

async function updateList() {
    const ul = document.getElementById("playlist-ul");
    const title = document.getElementById("playing-title");
    const playing = document.querySelector(".playing");
    ul.textContent = "";
    for (let i = 0; i < playlist.length; i++) {
        var result = await fetchAsync(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${playlist[i]}&key=${GAPIKey}`
        );
        if (i == 0) {
            title.innerText = result.items[0].snippet.title;
            playing.style.backgroundImage = `url(${result.items[0].snippet.thumbnails.medium.url})`;
        } else {
            var li = document.createElement("li");
            li.appendChild(
                document.createTextNode(result.items[0].snippet.title)
            );
            ul.appendChild(li);
        }
    }
}

inputProgress.addEventListener("mousedown", () => {
    window.clearInterval(progressTimer);
});
inputProgress.addEventListener("change", () => {
    player.seekTo(
        (player.getDuration() / inputProgress.max) * inputProgress.valueAsNumber
    );
});
inputProgress.addEventListener("input", () => {
    inputBackground(inputProgress);
    updateTime();
});

btnPlay.addEventListener("click", () => {
    if (player.getPlayerState() != YT.PlayerState.PLAYING) {
        player.playVideo();
    } else {
        player.pauseVideo();
    }
});

btnNext.addEventListener("click", () => {
    if (playlist.length > 1) {
        player.loadVideoById(playlist[1]);
        playlist.shift();
        saveSettings();
        updateList();
    }
});

inputVolume.addEventListener("input", () => {
    player.setVolume(inputVolume.valueAsNumber);
    inputBackground(inputVolume);
    setToolTipValue(inputVolume, tooltipVolume);
    saveSettings();
});

function saveSettings() {
    setCookie("volume", inputVolume.valueAsNumber, {
        expires: "Fri, 1 Jan 2077 00:00:00 GMT",
    });
    setCookie("playlist", JSON.stringify(playlist), {
        expires: "Fri, 1 Jan 2077 00:00:00 GMT",
    });
}

function loadSettings() {
    inputVolume.value = getCookie("volume");
    if (getCookie("playlist")) {
        playlist = JSON.parse(getCookie("playlist"));
    }
}
