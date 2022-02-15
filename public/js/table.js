function td(val) {
    val = val ?? '';
    if (typeof val === 'object')
        if (Object.keys(val).length)
            val = JSON.stringify(val);
        else val = '';

    return `<td>${val}</td>`;
}

let targeted = [];
let broadcast = [];

function addToList(data, list) {
    list.unshift(data);
    list.splice(1);
}

export function display(data) {
    if (data.private) {
        addToList(data, targeted);
        privateDiv.innerHTML = objectsToTable(targeted,"private message");

    } else {
        addToList(data, broadcast);
        broadcastDiv.innerHTML = objectsToTable(broadcast,"broadcast message");
    }
}

export function objectsToTable(ar,caption) {
    if (!ar.length) return '';

    const cols = Object.keys(ar[0]).filter(k=>k!=='private').sort();
    return `<table><caption>${caption}</caption>` + cols.reduce((t, col) => t + `<th>${col}</th>`, '<tr>') + '</tr>'
        + ar.reduce((t, o) => t
            + cols.reduce((row, col) => row + td(o[col]), '<tr>') + '</tr>', '')
        + '</table>';
}
