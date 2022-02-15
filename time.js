const formatter = new Intl.DateTimeFormat(['en-US'], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3
});

export function now() {
    return formatter.format(new Date());
}