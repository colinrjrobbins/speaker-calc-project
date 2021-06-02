const { BrowserWindow } = require('@electron/remote');

document.getElementById('information').addEventListener('click', e => {
    let win = new BrowserWindow({
        width: 300,
        height: 700,
        x: 10,
        y: 10,
        show: false
    });
    win.loadFile('./pages/Information/information.html');
    win.on('ready-to-show', win.show)
})