var storage = require(__dirname+'/../../storage/storage');

var template = function(markdownEditorWindows, BrowserWindow) {
  debugModeOn = (storage.get('environment') == "development")? true : false;
  this.send = function(event, args) { 
    markdownEditorWindows.menuAction(event, args);
  };
  return [{
    label: i18n.t('app'),
    submenu: [
      { label: i18n.t('app.about'), role: "about" },
      { label: i18n.t('app.preferences'), enabled: true, accelerator: "CmdOrCtrl+,", click: function(){send('app.preferences')} },
      { type: "separator" },
      { label: i18n.t('app.quit'), accelerator: "CmdOrCtrl+Q", click: function() { markdownEditorWindows.app.quit(); }}]
    }, {
      label: i18n.t('file'), submenu: [
        { label: i18n.t('file.new'), accelerator: "CmdOrCtrl+N", click: function() {send('file.new');} },
        { label: i18n.t('file.open'), accelerator: "CmdOrCtrl+O", click: function() {send('file.open');} },
        { label: i18n.t('file.close'), accelerator: "CmdOrCtrl+W", click: function() {send('file.close');} },
        { type: "separator" },
        { label: i18n.t('file.save'), accelerator: "CmdOrCtrl+S", click: function(){send('file.save');} },
        { label: i18n.t('file.save_as'), accelerator: "CmdOrCtrl+Shift+S", click: function(){send('file.save-as', {save_as: true});} },
        { type: "separator" },
        { label: i18n.t('file.export_pdf'), accelerator: "CmdOrCtrl+alt+P", click: function(){send('file.print', {pdf: true});} },
        { type: "separator" }
        ,{ label: i18n.t('file.debug'), enabled: false, visible: debugModeOn},
        { label: i18n.t('file.reload'), accelerator: "CmdOrCtrl+R", click: function() { BrowserWindow.getFocusedWindow().restart();}, visible: debugModeOn},
        { label: i18n.t('file.dev-tools'), accelerator: "CmdOrCtrl+Alt+I", click: function() { BrowserWindow.getFocusedWindow().toggleDevTools();}, visible: debugModeOn},
        { label: i18n.t('file.tests'), accelerator: "CmdOrCtrl+T", click: function() { send('test');}, visible: debugModeOn}]
    }, {
    label: i18n.t('edit'),
    submenu: [
      { label: i18n.t('edit.undo'), accelerator: "CmdOrCtrl+Z", role: "undo" },
      { label: i18n.t('edit.redo'), accelerator: "CmdOrCtrl+Shift+Z", role: "redo" },
      { type: "separator" },
      { label: i18n.t('edit.cut'), accelerator: "CmdOrCtrl+X", role: "cut" },
      { label: i18n.t('edit.copy'), accelerator: "CmdOrCtrl+C", role: "copy" },
      { label: i18n.t('edit.paste'), accelerator: "CmdOrCtrl+V", role: "paste" },
      { label: i18n.t('edit.select_all'), accelerator: "CmdOrCtrl+A", role: "selectAll" }]
    }, {
      label: i18n.t('view'), submenu: [
        { label: i18n.t('view.toggle'), accelerator: "CmdOrCtrl+Shift+P", click: function(){send('view.toggle-preview')} }
      ]
    },
    // {
    //   label: "Actions", submenu: []
    // }, {
    //   label: "Window", submenu: []
    // },
    {
      label: i18n.t('help'), role: 'help', submenu: []
  }];
};

module.exports = template;