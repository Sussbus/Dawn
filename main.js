const electron = require('electron')
const ipc = require('electron').ipcMain;
const path = require('path')
const url = require('url')
const fixPath = require('fix-path');

fixPath();

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 600, height: 400, frame: false, resizable: false, show: false})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'Dawn.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  ipc.on('show-main-window', function (event) {
    mainWindow.center()
    mainWindow.show()
  })
  ipc.on('hide-main-window', function (event) {
    mainWindow.hide()
  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

//Creating menu item
var menubar = require('menubar')

var mb = menubar({icon: path.join(__dirname, './assets/DawnIcon.png')})

mb.on('ready', function ready () {
  console.log('app is ready')
})

mb.on('show', function show () {
  //alert('4tibiu')
  //console.log('showing app',browserWindows)
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.