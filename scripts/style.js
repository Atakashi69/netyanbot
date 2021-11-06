function inputBackground(input) {
    var value = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty(
        "--bg-color",
        "linear-gradient(to right, #1db954 0%, #1db954 " +
            value +
            "%, #535353 " +
            value +
            "%, #535353 100%)"
    );
}

function secondsToTime(seconds) {
    var hours = Math.floor(seconds / 60 / 60);
    seconds -= hours * 60 * 60;
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds - mins * 60);
    var result = "";
    if (hours > 0) {
        result += hours + ":";
        result += (mins > 9 ? mins : "0" + mins) + ":";
        result += secs > 9 ? secs : "0" + secs;
        return result;
    } else {
        result += mins > 0 ? mins + ":" : "0:";
        result += secs > 9 ? secs : "0" + secs;
    }
    return result;
}

function updateTime() {
    document.querySelector(".duration").innerText = secondsToTime(
        player.getDuration()
    );
    document.querySelector(".currenttime").innerText = secondsToTime(
        (player.getDuration() / inputProgress.max) * inputProgress.valueAsNumber
    );
}

function setToolTipValue(input, tooltip) {
    const newValue = Number(
        ((input.value - input.min) * 100) / (input.max - input.min)
    );
    //6 is the size half of circle size, 0.12 = (size / 100)
    const newPosition = 6 - newValue * 0.12;
    tooltip.innerHTML = `<span>${input.value}</span>`;
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
}
