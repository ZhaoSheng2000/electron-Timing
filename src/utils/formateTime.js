export default function (t = 0) {
    const
        sec = appendZero(Number.parseInt(t%60)),
        min = appendZero(Number.parseInt(t/60%60)),
        hour = appendZero(Number.parseInt(t/3600));

    return `${hour}:${min}:${sec}`;

}

const appendZero = n=>n.toLocaleString({},{minimumIntegerDigits:2});