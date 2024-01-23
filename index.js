const { app,BrowserWindow,ipcMain,shell, Menu, globalShortcut} = require("electron")
const remote = require("@electron/remote/main") //1 
const fs = require('fs');
const {join} = require('path');

remote.initialize()//2

let mainWindow = null


if (process.platform === 'darwin') {
  const template = [
    {
      label: "Application",
      submenu: [
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]
    },
    {
      label: "Edit",
      submenu: [
        //{ label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        //{ label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' },
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
} else {
  Menu.setApplicationMenu(null)
}
const userIconPath = join(__dirname, 'resources', 'huwen.icns');
app.setAppUserModelId(userIconPath);

app.on("ready",()=>{
    mainWindow = new BrowserWindow({
        width:640,
        height:480,
        webPreferences:{
            nodeIntegration:true,//允许渲染进程使用nodejs
            contextIsolation:false//允许渲染进程使用nodejs
        }
    })
    // if (process.platform === "darwin") {
    //     let contents = mainWindow.webContents;
    //     globalShortcut.register("CommandOrControl+C", () => {
    //       contents.copy();
    //     });
    //     globalShortcut.register("CommandOrControl+V", () => {
    //       contents.paste();
    //     });
    //   }
    mainWindow.maximize();
    mainWindow.loadURL("https://chat.openai.com/")
    //mainWindow.openDevTools()
    mainWindow.on("closed",()=>{
        mainWindow = null
    })
    remote.enable(mainWindow.webContents)//3
})