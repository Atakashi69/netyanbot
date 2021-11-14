const GAPIKey = "AIzaSyDcROm-3Y58HqDLd1zTBbEYE8okE-cRw40";

function getYTIDFromUrl(url) {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return match[1];
}

async function fetchAsync(url) {
    try {
        const response = await (await fetch(url)).json();
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

ComfyJS.onChat = (user, message, flags, self, extra) => {
    if (flags.customReward && extra.customRewardId === rewardId) {
        var regExp = /youtube.com\S+|youtu.be\S+/;
        message = message.match(regExp).pop();
        addSong(getYTIDFromUrl(message), user);
    }
};

async function addSong(YTID, username) {
    try {
        await fetchAsync(
            `https://www.googleapis.com/youtube/v3/videos?id=${YTID}&part=contentDetails&key=${GAPIKey}`
        ).then((response) => {
            if (
                YTDurationToSeconds(
                    response.items[0].contentDetails.duration
                ) <= 300
            ) {
                playlist.push(YTID);
                updateList();
                saveSettings();
                if (playlist.length == 1) {
                    player.loadVideoById(playlist[0]);
                    player.playVideo();
                }
                console.log(playlist);
                fetchAsync(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${YTID}&key=${GAPIKey}`
                ).then((result) => {
                    ComfyJS.Say(
                        `@${username} -> "${result.items[0].snippet.title}" был добавлен в очередь на позицию #${playlist.length}`
                    );
                });
            } else {
                ComfyJS.Say(
                    `@${username} -> Трек не был добавлен в очередь т.к. его длительность превышает 5 минут`
                );
            }
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

function YTDurationToSeconds(duration) {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    match = match.slice(1).map(function (x) {
        if (x != null) {
            return x.replace(/\D/, "");
        }
    });

    var hours = parseInt(match[0]) || 0;
    var minutes = parseInt(match[1]) || 0;
    var seconds = parseInt(match[2]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
}
