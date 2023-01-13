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
    else if (command == "песня" || command == "song" || command == "track" || command == "трек") currentSong(user);
    else if (command == "котик" || command == "kitty") kittyMeter(user);
    else if (command == "розыгрыш" || command == "giveaway") giveaway(user);
    else if (command == "высадка") forRaid();
    else if (command == "меч") swordMeter(user);
    else if (command == "love") loveMeter(user, message);
    else if (command == "old" || command == "олд") oldMeter(user);
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
        ComfyJS.Say("✿ Не стесняйся вступать в мой Discord сервер ₍ᐢ..ᐢ₎♡ https://discord.gg/e8GW8CRj6a");
        discordLineCount = 0;
    }
}, 23 * 60 * 1000);

var donateInterval = setInterval(() => {
    if (donateLineCount > 5) {
        ComfyJS.Say(
            "С помощью доната ты можешь поддержать стримера! netyanKuromiLove https://www.donationalerts.com/r/netyann"
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

async function loveMeter(user1, user2) {
    ComfyJS.Say(`${user1} любит ${user2} на ${Math.floor(Math.random() * 101)}%`);
}

function hornyMeter(user) {
    var horny = Math.floor(Math.random() * 202);
    if (horny == 201) horny = 101;
    else horny = Math.floor(horny / 2);
    ComfyJS.Say(`${user} хорни на ${horny}% ${horny > 50 ? "netyanHorny" : "peepoShy"}`);
}

function kittyMeter(user) {
    var kitty = Math.floor(Math.random() * 101);
    ComfyJS.Say(`${user} котик на ${kitty}% netyanToptop`);
}

function swordMeter(user) {
    var sword = Math.floor(Math.random() * 26);
    ComfyJS.Say(`${user} длина твоего меча ${sword}см ${sword < 15 ? "AzusaLaugh" : "GIGACHAD"}`);
}

function dayDiff(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

async function oldMeter(user) {
    var startDate = new Date("2020-06-01");
    var streamDuration = dayDiff(startDate, new Date());
    fetch(`https://beta.decapi.me/twitch/followage/netyann/${user}`).then(response => response.text()).then(result => {
        var followDuration = result;
        var arr = followDuration.split(", ");
        var k = 0;
        arr.forEach(e => {
            var num = Number(e.split(" ")[0]);
            var word = e.split(" ")[1];
            if (word.includes("year")) k += num * 365;
            if (word.includes("month")) k += num * 30;
            if (word.includes("week")) k += num * 7;
            if (word.includes("day")) k += num;
        })
        console.log(k);
        ComfyJS.Say(`@${user} олд на ${Math.round((k / streamDuration) * 100)}%`);
    });
}

async function forRaid() {
    ComfyJS.Say("netyanToptop Атака netyanToptop титяновцев netyanToptop удалась netyanToptop");
}

async function currentSong(user) {
    if (playlist.length <= 0) return;
    try {
        await fetchAsync(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${playlist[0]}&key=${GAPIKey}`
        ).then((result) => {
            ComfyJS.Say(`@${user} -> ${result.items[0].snippet.title} (http://youtu.be/${playlist[0]})`);
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
