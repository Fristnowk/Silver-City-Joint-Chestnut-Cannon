const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');

// 禁止显示默认菜单
Menu.setApplicationMenu(null);
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    title: 'Electron + Vue3',
    // 设置最小尺寸
    minWidth: 800,
    minHeight: 600,
    // 全屏
    fullscreen: false,
    // 配置窗口的WebPreferences选项，用于控制渲染进程的行为
    webPreferences: {
      nodeIntegration: true, // 启用Node.js集成
      contextIsolation: false, // 禁用上下文隔离
      webSecurity: false, // 禁用web安全策略
    },
  });

  // 主要改了这里
  // mainWindow.loadFile(path.join(__dirname, "./index.html"));
  // 使用 loadURL 加载 http://localhost:3004 ，也就是我们刚才创建的 Vue 项目地址
  // 3004 改为你 Vue 项目的端口号

  // 根据命令行参数加载URL或本地文件;
  if (process.env.NODE_ENV) {
    mainWindow.loadURL('http://localhost:8090');
    // 开发环境下，打开开发者工具。
    mainWindow.webContents.openDevTools();
  } else {
    const ex = process.execPath;
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    // app.setLoginItemSettings({
    //   openAtLogin: true,
    //   openAsHidden: true,
    //   path: ex,
    //   args: [],
    // });
    // mainWindow.webContents.openDevTools();
  }

  // 配置关闭进程方法
  ipcMain.on('window-close', function () {
    mainWindow.close();
  });

  process.resourcesPath = app.getPath('exe');
};
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

app.whenReady().then(() => {
  createWindow();
});
