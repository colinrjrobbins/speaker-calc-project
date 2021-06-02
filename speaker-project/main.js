const { app, BrowserWindow } = require('electron');
const { session } = require('electron');
require('@electron/remote/main').initialize();

let mainWindow;

function startApp() {
    // session is wiped at the end of each session 
    let customSes = session.fromPartition('part1');
    // session if you want a persistant session
    let customSes2 = session.fromPartition('persist:part1');

    mainWindow = new BrowserWindow({

        width: 1000,
        height: 800,
        minWidth: 300,
        minHeight: 300,
        webPreferences: { 
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true },
        show: false,
        backgroundColor: 'black',
        titleBarStyle: 'hidden',
        frame: true,
        partition: 'persist:part1'
    });

    let ses = mainWindow.webContents.session;
    // default partition uses restart save
    let defaultSes = session.defaultSession;

    // clears cookies, any data, etc.
    // ses.clearStorageData()

    defaultSes.cookies.get({})
        .then(cookies =>
            console.log(cookies))
        .catch(errors =>
            console.log(errors))

    console.log(Object.is(ses, defaultSes));

    console.log("Created window.");

    mainWindow.loadFile('./pages/Index/index.html');
    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', mainWindow.show)

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.on('ready', () => {
    startApp();
});