const { app, BrowserWindow } = require('electron');
const { session } = require('electron');
require('@electron/remote/main').initialize();

const { Menu, MenuItem } = require('electron');

let mainWindow;

let mainMenu = Menu.buildFromTemplate(
    require('./menus/TopBar/topbar')
)

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

    Menu.setApplicationMenu(mainMenu);

    // clears cookies, any data, etc.
    // ses.clearStorageData()

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