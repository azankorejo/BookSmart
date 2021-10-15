module.exports = {
  publicPath: '',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId : "com.booksmart.app",
        productName: "Booksmart",
        target : "NSIS",
        nsis : {
          allowToChangeInstallationDirectory : true,
          oneClick : false
        },
        win: {
          icon: "./public/icon.png",
          target: "NSIS"
        }
      }
    }
  }
}
