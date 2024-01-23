const path = require('path');
const builder = require('electron-builder');

builder.build({

    projectDir: path.resolve(__dirname),  // 專案路徑 

    // win: {
    //         "target": [
    //             {
    //                 "target":"nsis",
    //                 "arch": [
    //                     "x64"
    //                 ]
    //             }
    //         ]
    // },
    //linux: ['AppImage'],
    //win: ['nsis'],  // nsis . portable
    //x64: true,  // x64
    arm64: true,
    config: {
        "appId": "com.hl.echatgpt4",
        "productName": "deskgpt", // 應用程式名稱 ( 顯示在應用程式與功能 )
        "directories": {
            //"output": "build/win"
            //"output": "build/linux"
            "output": "build/mac",
        },
        "files": [
            'resource/**/*',
            'index.js'
        ],
        "mac": {
            icon: path.resolve(__dirname, 'resource/Icons/Mac/AppIcon.appiconset/icon-512@2x.png'),
        },
        "dmg": {
            icon: path.resolve(__dirname, 'resource/Icons/Mac/AppIcon.appiconset/icon-512@2x.png'),
        },
        // "win": {
        //      "icon": path.resolve(__dirname, 'resource/huwen.ico'),
        // }
    },
})
    .then(
        data => console.log(data),
        err => console.error(err)
    );