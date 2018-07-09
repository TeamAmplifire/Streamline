
function formatTwoDigits(n) {
    return n < 10 ? '0' + n : n;
}

export function formatTime(seconds) {
    const ss = Math.floor(seconds) % 60;
    const mm = Math.floor(seconds / 60) % 60;
    const hh = Math.floor(seconds / 3600);

    if (hh > 0) {
        return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss);
    } 
    return mm + ':' + formatTwoDigits(ss);
}
