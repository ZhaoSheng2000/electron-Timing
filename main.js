// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, Menu, globalShortcut,shell} = require('electron');
const path = require('path');

Menu.setApplicationMenu(null) //取消菜单栏
let tray = null

app.allowRendererProcessReuse = true;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    console.log('=========>app---whenready');
    //取消dock栏中显示
    app.dock.hide()
    // createWindow();
    // const menu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(menu)
});

app.on('ready', () => {
    //定义菜单
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示主界面',
            accelerator: (() => 'CmdOrCtrl+W')(),
            click: () => {
                mainWindow.show()
            }
        },
        {
            label: '置顶窗口',
            type: 'checkbox',
            click: () => {
                if (mainWindow.isAlwaysOnTop()) {
                    mainWindow.setAlwaysOnTop(false)

                } else {
                    mainWindow.setAlwaysOnTop(true)
                }
            }
        },
        {
            label: '更多...',
            click: () => {
                moreWindow.show()
            }
        },
        {
            label: '关于作者',
            click: () => {
                shell.openExternal('https://zhaosheng2000.github.io/')
            }
        },
        {
            label: '退出',
            accelerator: (() => 'CmdOrCtrl+Q')(),
            click: () => {
                mainWindow.destroy()
                mainWindow = null
                moreWindow.destroy()
                moreWindow = null
                app.quit()
            }
        }
    ])
    tray = new Tray(path.join(__dirname, './icon.png'));
    tray.setContextMenu(contextMenu)
    //点击显示窗口
    tray.on('click', () => {
        mainWindow.show();
    })

    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 280,
        // frame: false,
        // alwaysOnTop: true,
        webPreferences: {
            webSecurity: false,//禁用窗口同源策略：
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.loadURL('file:///Users/mac/WebstormProjects/electron-timing/build/index.html#/')
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
    //点击X时隐藏窗口
    mainWindow.on('close', e => {
        mainWindow.hide();
        e.preventDefault();
    })
    //创建'更多'窗口
    let moreWindow = new BrowserWindow({
        width: 950,
        height: 600,
        minWidth: 350,
        show: false,
        // frame: false,
        // alwaysOnTop: true,
        webPreferences: {
            webSecurity: false,//禁用窗口同源策略：
            nodeIntegration: true,
        }
    });
    moreWindow.loadURL('http://localhost:3000/#/more');
    // moreWindow.loadURL('file:///Users/mac/WebstormProjects/electron-timing/build/index.html#/more')
    //隐藏'more'窗口
    moreWindow.webContents.openDevTools()

    moreWindow.on('close', e => {
        moreWindow.hide();
        e.preventDefault();
    })


    //监听快捷键
    globalShortcut.register('CmdOrCtrl+W', () => {
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else
            mainWindow.show()
    })

    globalShortcut.register('CmdOrCtrl+Q', () => {
        mainWindow.destroy()
        moreWindow.destroy()
        mainWindow = null
        moreWindow = null
        app.quit()
    })
    globalShortcut.register('CmdOrCtrl+R', () => {
        mainWindow.reload()
    })
});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    console.log('=========>window-all-closed');
    if (process.platform !== 'darwin') app.quit()
})

app.on('will-quit', () => {
    // 注销所有快捷键
    globalShortcut.unregisterAll()
    console.log('程序结束，注销快捷键')
})
