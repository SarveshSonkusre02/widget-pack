// google-search/main.js
const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  const { screen } = require('electron');
  const mainScreen = screen.getPrimaryDisplay();
  const dimensions = mainScreen.size;

  mainWindow = new BrowserWindow({
    width: 200,
    height: 50,
    x: dimensions.width - 200,
    y: 200, /* Adjusted y-coordinate */
    resizable: false,
    maximizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true, /* Widget always on top */
    skipTaskbar: true, /* Do not appear on the taskbar */
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
