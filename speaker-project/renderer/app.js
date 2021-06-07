const { BrowserWindow } = require('@electron/remote');
const { ipcRenderer } = require('electron')
const path = require('path');

document.getElementById('information').addEventListener('click', e => {
    let infoWin = new BrowserWindow({
        width: 300,
        height: 700,
        x: 10,
        y: 10,
        show: false
    });
    infoWin.loadFile('./renderer/Information/information.html');
    infoWin.on('ready-to-show', infoWin.show)
});

document.getElementById('determine').addEventListener('click',e=>{
    ipcRenderer.send('quizScreen', 'prepare window')
})


document.getElementById('calculators').addEventListener('click', e=>{
    let calcWin = new BrowserWindow({
        width: 500,
        height: 700,
        webPreferences: {nodeIntegration:true},
        show: false
    })
    calcWin.loadFile('./renderer/Calculators/calculators.html')
    calcWin.on('ready-to-show', calcWin.show)
})