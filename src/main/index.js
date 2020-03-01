import {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import Store from  'secure-electron-store';
const fs = require("fs");

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1600,
    height: 900,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      additionalArguments: [`storePath:${app.getPath("userData")}`],
      nodeIntegration: false,
      preload: path.resolve(__dirname, "..", "..", "dist", "preload.js")
    }
  });
  
  ipcMain.on('minimize-window', ()=>{
    if (mainWindow !== null) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });
  
  ipcMain.on('minimize-window', ()=>{
    if (mainWindow !== null) {
      window.minimize();
    }
  });
  
  // Sets up main.js bindings for our electron store
  const store = new Store({
    path: app.getPath("userData")
  });
  store.mainBindings(ipcMain, window, fs);

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:1212/index.html`);
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }));
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
    return;
  }
  
  store.clearMainBindings(ipcMain);
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow();
});
