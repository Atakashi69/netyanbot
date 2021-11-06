const TWITCHUSER = "netyann";
const OAUTH = "oauth:qnljd4uyt6fw095o57u8bvdsfix0ml";
const rewardId = "799efafa-9b2c-4c80-93fb-a6ed8659e66f";

ComfyJS.Init(TWITCHUSER, OAUTH);

ComfyJS.onCommand = (user, command, message, flags, extra) => {
    if (command == "кусь" || command == "bite") biteRandomUser(user);
    if (command == "horny" || command == "хорни") hornyMeter(user);
};

async function biteRandomUser(user) {
    console.log(user);
    try {
        await (
            await fetch(`https://decapi.me/twitch/random_user/${TWITCHUSER}`)
        )
            .text()
            .then((randomUser) => {
                ComfyJS.Say(
                    user + " укусил(а) за ушко " + randomUser + " AzusaLaugh"
                );
            });
    } catch (e) {
        console.log(e);
        throw e;
    }
}

function hornyMeter(user) {
    var horny = Math.floor(Math.random() * 101);
    ComfyJS.Say(
        `${user} хорни на ${horny}% ${horny > 50 ? "BOOBA" : "peepoShy"}`
    );
}

function setCookie(name, value, options = {}) {
    options = {
        path: "/",
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);

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
        new RegExp(
            "(?:^|; )" +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1,
    });
}
