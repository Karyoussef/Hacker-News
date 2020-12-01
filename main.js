const electron = require('electron')
const path = require('path')
const {app, BrowserWindow, webContents} = require('electron')

const loadPosts = require(path.join(__dirname,'./utils/loadTwenty'))
const loadSinglePost = require(path.join(__dirname, './utils/loadPost'))

const {ipcMain} = require('electron');

let win;

var neededHtml ;

createMainWindow = async () => {

    win = new BrowserWindow({
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule :true
        }
    })
    win.loadFile(path.join(__dirname,'views/homeScreen.html'));
    win.maximize();
    const posts = await loadPosts(0)
    win.webContents.send('fetchedPosts', posts)
    

}


app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })