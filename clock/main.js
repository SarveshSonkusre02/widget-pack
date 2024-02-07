//clock/main.js
const { app, BrowserWindow, screen, ipcMain } = require('electron');

let widgetWindow;

function createWidgetWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  widgetWindow = new BrowserWindow({
    width: 230,
    height: 75,
    x: width - 230, // Shifted to the right edge
    y: 0,           // Aligned with the top edge
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Make the window ignore mouse events
  widgetWindow.setIgnoreMouseEvents(true);

  widgetWindow.loadFile('index.html');

  // Make the window draggable
  widgetWindow.webContents.on('did-finish-load', () => {
    widgetWindow.webContents.send('window-loaded');
  });
}

// IPC communication for making the window draggable
ipcMain.on('drag-window', (event, arg) => {
  const { offsetX, offsetY } = arg;
  widgetWindow.setPosition(offsetX, offsetY, true);
});

app.whenReady().then(() => {
  createWidgetWindow();

  app.on('activate', function () {
    if (!widgetWindow) createWidgetWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
