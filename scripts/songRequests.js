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

var sinceLastKlee = 0, sinceLastKEKW = 0, sinceLastCatJAM = 0;
ComfyJS.onChat = (user, message, flags, self, extra) => {
    wobbleLineCount++;
    discordLineCount++;
    donateLineCount++;
    
    if (message == "KEKW" && (extra.timestamp - sinceLastKEKW) >= 100000) {
        ComfyJS.Say("KEKW");
        sinceLastKEKW = extra.timestamp;
    }
    else if (message == "netyanKlee" && (extra.timestamp - sinceLastKlee) >= 100000) {
        ComfyJS.Say("netyanKlee");
        sinceLastKlee = extra.timestamp;
    }
    else if (message == "catJAM" && (extra.timestamp - sinceLastCatJAM) >= 100000) {
        ComfyJS.Say("catJAM");
        sinceLastCatJAM = extra.timestamp;
    }
    
    if (flags.customReward && extra.customRewardId === rewardSongRequestID) {
        var regExp = /youtube.com\S+|youtu.be\S+/;
        var filter = message.match(regExp);
        if (filter) {
            message = filter.pop();
            addSong(getYTIDFromUrl(message), user);
        } else {
            ComfyJS.Say(`@${user} -> Трек не был добавлен в очередь, Вы скинули неправильную ссылку`);
        }
    }
};

async function addSong(YTID, user) {
    try {
        await fetchAsync(
            `https://www.googleapis.com/youtube/v3/videos?id=${YTID}&part=contentDetails&key=${GAPIKey}`
        ).then((response) => {
            if (YTDurationToSeconds(response.items[0].contentDetails.duration) <= 300) {
                playlist.push(YTID);
                updateList();
                saveSettings();
                if (playlist.length == 1) {
                    player.loadVideoById(playlist[0]);
                    player.playVideo();
                }
                console.log(playlist);
                fetchAsync(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${YTID}&key=${GAPIKey}`).then(
                    (result) => {
                        ComfyJS.Say(
                            `@${user} -> "${result.items[0].snippet.title}" был добавлен в очередь на позицию #${playlist.length}`
                        );
                    }
                );
            } else {
                ComfyJS.Say(`@${user} -> Трек не был добавлен в очередь т.к. его длительность превышает 5 минут`);
            }
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

/*async function wish() {
    var pool = {
        legend: ["Ху Тао", "Дилюк", "Мона", "Ци Ци", "Кэ Цин", "Джинн"],
        epic: [
            "Эмбер",
            "Барбара",
            "Бэй Доу",
            "Беннетт",
            "Чун Юнь",
            "Диона",
            "Фишль",
            "Кэйа",
            "Кудзё Сара",
            "Лиза",
            "Нин Гуан",
            "Ноэлль",
            "Рэйзор",
            "Розария",
            "Саю",
            "Сахароза",
            "Тома",
            "Сян Линь",
            "Син Цю",
            "Синь Янь",
            "Янь Фэй",
            "Ржавый лук",
            "Бесструнный",
            "Око сознания",
            "Песнь странника",
            "Копьё Фавония",
            "Дождерез",
            "Меч-колокол",
            "Драконий рык",
            "Меч-флейта",
            "Церемониальный лук",
            "Боевой лук Фавония",
            "Церемониальные мемуары",
            "Кодекс Фавония",
            "Гроза драконов",
            "Церемониальный двуручный меч",
            "Двуручный меч Фавония",
            "Церемониальный меч",
            "Меч Фавония",
        ],
        common: ["Дубина переговоров"],
    };

    var chance = Math.floor(Math.random() * 1000 + 1);
    var result;
    console.log(chance);
    if (chance <= 6) {
        result = pool.legend[Math.floor(Math.random() * pool.legend.length)];
        ComfyJS.Say(`Поздравляем! Ты получил(а) ${result}⭐`);
    } else if (result > 6 && result <= 57) {
        result = pool.epic[Math.floor(Math.random() * pool.epic.length)];
        ComfyJS.Say(`Поздравляем! Ты получил(а) ${result}`);
    } else {
        result = pool.common[Math.floor(Math.random() * pool.common.length)];
        ComfyJS.Say(`Поздравляем! Ты получил(а) ${result}`);
    }
}*/

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
