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
        playlist.push(getYTIDFromUrl(message));
        saveSettings();
        updateList();
        if (playlist.length == 1) {
            player.loadVideoById(playlist[0]);
            player.playVideo();
        }
    }
};
