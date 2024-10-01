const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getRandomQuote: () => ipcRenderer.invoke('get-random-quote'),
  setWindowSize: (width, height) => ipcRenderer.invoke('set-window-size', width, height),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),

  // more!
  saveApiKey: (apiKey) => ipcRenderer.invoke('save-api-key', apiKey),
  getApiKey: () => ipcRenderer.invoke('read-api-key'),
  saveQuoteType: (quoteType) => ipcRenderer.invoke('save-quote-type', quoteType),
  getQuoteType: () => ipcRenderer.invoke('read-quote-type'),
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),
  openUrl: (url) => ipcRenderer.invoke('open-url', url),
  updateQuotes: () => ipcRenderer.invoke('update-quotes'),
});
