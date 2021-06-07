const { app, BrowserWindow } = require('electron');
const { session } = require('electron');
require('@electron/remote/main').initialize();
const windowStateKeeper = require('electron-window-state');
const path = require('electron');
const { ipcMain } = require('electron');

const { Menu } = require('electron');

let mainWindow;

let mainMenu = Menu.buildFromTemplate(
    require('./menus/TopBar/topbar')
)

function startApp() {

    let state = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 600
    })

    // session is wiped at the end of each session 
    let customSes = session.fromPartition('part1');
    // session if you want a persistant session
    let customSes2 = session.fromPartition('persist:part1');

    mainWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
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

    state.manage(mainWindow);

    // clears cookies, any data, etc.
    // ses.clearStorageData()

    mainWindow.loadFile('./renderer/Index/main.html');
    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', mainWindow.show)

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

ipcMain.on('quizScreen', (e, args) => {
    let quizWin = new BrowserWindow({
        width: 500,
        height: 700,
        webPreferences: { nodeIntegration: true,
                          contextIsolation: false,
                          preload: './renderer/QuickCheck/quickcheck.js'},
        show: false
    })
    quizWin.loadFile('./renderer/QuickCheck/quickcheck.html');
    quizWin.on('ready-to-show', quizWin.show)
})

app.whenReady().then(()=>{
    startApp();
});