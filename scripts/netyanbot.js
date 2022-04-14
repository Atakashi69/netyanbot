const TWITCHUSER = "netyann";
const OAUTH = "oauth:xdcd4quhxig9fz77roxlop2fcvswcg";
const rewardSongRequestID = "799efafa-9b2c-4c80-93fb-a6ed8659e66f";

var wobbleLineCount = 0,
    discordLineCount = 0,
    donateLineCount = 0;

ComfyJS.Init(TWITCHUSER, OAUTH);

ComfyJS.onCommand = (user, command, message, flags, extra) => {
    if (command == "кусь" || command == "bite") {
        if (!message) biteRandomUser(user);
        else biteUser(user, message);
    }
    if (command == "онлифанс" || command == "onlyfans") ComfyJS.Say("https://clck.ru/3vyXS peepoShy");
    else if (command == "хорни" || command == "horny") hornyMeter(user);
    else if (command == "песня" || command == "song") currentSong(user);
    else if (command == "котик" || command == "kitty") kittyMeter(user);
    else if (command == "розыгрыш" || command == "giveaway") giveaway(user);
    else if (command == "высадка") forRaid();
    else if (command == "чмоня") chmonyaMeter(user);
};

ComfyJS.onRaid = (user, viewers, extra) => {
    ComfyJS.Say("Добро пожаловать рейдерам канала " + user + "! (´｡• ᵕ •｡`) ♡");
};

var wobbleInterval = setInterval(() => {
    if (wobbleLineCount > 5) {
        ComfyJS.Say("netyanWobble");
        wobbleLineCount = 0;
    }
}, 11 * 60 * 1000);

var discordInterval = setInterval(() => {
    if (discordLineCount > 5) {
        ComfyJS.Say("/announceblue ✿ Не стесняйся вступать в мой Discord сервер ₍ᐢ..ᐢ₎♡ https://discord.gg/e8GW8CRj6a");
        discordLineCount = 0;
    }
}, 23 * 60 * 1000);

var donateInterval = setInterval(() => {
    if (donateLineCount > 5) {
        ComfyJS.Say(
            "С помощью доната ты можешь поддержать стримера! netyanBearLove  https://www.donationalerts.com/r/netyann"
        );
        donateLineCount = 0;
    }
}, 30 * 60 * 1000);

async function biteUser(user1, user2) {
    try {
        await (await fetch(`https://decapi.me/twitch/id/${user2}`)).text().then((id) => {
            console.log(id);
            if (id != "404 Page Not Found") ComfyJS.Say(`${user1} укусил(а) за ушко ${user2} AzusaLaugh`);
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function biteRandomUser(user) {
    try {
        await (await fetch(`https://decapi.me/twitch/random_user/${TWITCHUSER}`)).text().then((randomUser) => {
            ComfyJS.Say(`${user} укусил(а) за ушко @${randomUser} AzusaLaugh`);
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

function hornyMeter(user) {
    var horny = Math.floor(Math.random() * 101);
    ComfyJS.Say(`${user} хорни на ${horny}% ${horny > 50 ? "netyanHorny" : "peepoShy"}`);
}

function kittyMeter(user) {
    var kitty = Math.floor(Math.random() * 101);
    ComfyJS.Say(`${user} котик на ${kitty}% netyanToptop`);
}

function chmonyaMeter(user) {
    var chmonya = Math.floor(Math.random() * 101);
    ComfyJS.Say(`${user} чмоня на ${chmonya}% netyanWobble`);
}

async function forRaid() {
    ComfyJS.Say("netyanToptop Высадка netyanToptop нетяновцев netyanToptop удалась netyanToptop");
}

async function currentSong(user) {
    if (playlist.length <= 0) return;
    try {
        await fetchAsync(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${playlist[0]}&key=${GAPIKey}`
        ).then((result) => {
            ComfyJS.Say(`@${user} -> ${result.items[0].snippet.title}`);
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

function setCookie(name, value, options = {}) {
    options = {
        path: "/",
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1,
    });
}
