const { app, BrowserWindow } = require('electron');
const { session } = require('electron');

let mainWindow;
let secondaryWindow;

function createWindow() {
    // session is wiped at the end of each session 
    let customSes = session.fromPartition('part1');
    // session if you want a persistant session
    let customSes2 = session.fromPartition('persist:part1');

    mainWindow = new BrowserWindow({

        width: 1000,
        height: 800,
        minWidth: 300,
        minHeight: 300,
        webPreferences: { nodeIntegration: true },
        show: false,
        backgroundColor: 'black',
        titleBarStyle: 'hidden',
        frame: true,
        partition: 'persist:part1'
    });

    secondaryWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            session: customSes
        },
        // model attaches the child window to the parent window
        // modal: true,
        parent: mainWindow,
        show: false
    })

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

    mainWindow.loadFile('index.html');
    // secondaryWindow.loadFile('secondary.html');

    // setTimeout(() => {
    //     secondaryWindow.show();
    //     setTimeout(() => {
    //         secondaryWindow.close();
    //         secondaryWindow = null;
    //     }, 3000);
    // }, 2000)

    // mainWindow.webContents.openDevTools();

    // waits until the mainwindow is ready before showing it
    // to avoid a blank screen.
    mainWindow.once('ready-to-show', mainWindow.show)

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
    secondaryWindow.on('closed', () => {
        secondaryWindow = null;
    })
}

app.on('ready', () => {
    console.log(app.getPath('userData'));
    createWindow();
});