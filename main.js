const { app, BrowserWindow, ipcMain, shell } = require('electron');

// const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.handle('get-random-quote', () => {
  const quotes = JSON.parse(fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf8'));
  return quotes[Math.floor(Math.random() * quotes.length)];
});

// IPC handler for opening URLs
ipcMain.handle('open-url', (event, url) => {
  shell.openExternal(url);
});


/////
ipcMain.handle('save-api-key', (event, apiKey) => {
  fs.writeFileSync(path.join(__dirname, 'api_key.txt'), apiKey, 'utf8');
});

ipcMain.handle('open-settings', () => {
  const settingsWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  });

  settingsWindow.loadFile('settings.html');

  settingsWindow.once('ready-to-show', () => {
    settingsWindow.show();
  });
});

ipcMain.handle('toggle-fullscreen', (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
  }
});

// Handle reading from a text file
ipcMain.handle('read-api-key', async () => {
  const filePath = path.join(__dirname, 'api_key.txt');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error('Error reading API key:', err);
    return ''; // Return an empty string in case of an error
  }
});

ipcMain.handle('save-quote-type', (event, quotePrefer) => {
  const filePath = path.join(__dirname, 'quote_prefer.txt');

  // Clean the input: remove emojis, special characters, trim spaces, ensure commas, and remove multiple commas
  const cleanedQuotePrefer = quotePrefer
    .replace(/[^\w\s,]/g, '')  // Remove non-word characters (anything that isn't a letter, number, comma, or space)
    .trim()                    // Remove leading/trailing spaces
    .replace(/\s*,\s*/g, ',')  // Clean up spaces around existing commas
    .replace(/\s+/g, ',')      // Replace remaining spaces between words with commas
    .replace(/,+/g, ',');      // Replace multiple commas with a single comma

  fs.writeFileSync(filePath, cleanedQuotePrefer, 'utf8');
});


ipcMain.handle('read-quote-type', () => {
  const filePath = path.join(__dirname, 'quote_prefer.txt');
  try {
      return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
      console.error('Error reading quote preferences:', err);
      return ''; // Return an empty string if there's an error
  }
});

//////////////

ipcMain.handle('update-quotes', async () => {
  const apiKeyPath = path.join(__dirname, 'api_key.txt');
  const quotesPath = path.join(__dirname, 'quotes.json');
  const quotePreferPath = path.join(__dirname, 'quote_prefer.txt');
  const apiUrl = 'https://quotes.miragek.com/api?rand=30&category=';

  // Read API key from api_key.txt
  let apiKey;
  try {
    apiKey = fs.readFileSync(apiKeyPath, 'utf8').trim();
  } catch (err) {
    console.error('Error reading API key:', err);
    return { success: false, message: 'Failed to read API key.' };
  }

  // Read categories from quote_prefer.txt
  let categories;
  try {
    categories = fs.readFileSync(quotePreferPath, 'utf8')
      .replace(/[^\w\s,]/g, '')  // Clean up non-word characters (no special characters or emojis)
      .trim()                    // Remove leading/trailing spaces
      .replace(/\s*,\s*/g, ',')  // Clean up spaces around existing commas
      .replace(/\s+/g, ',')      // Replace spaces between words with commas
      .replace(/,+/g, ',');      // Remove multiple consecutive commas
  } catch (err) {
    console.error('Error reading quote_prefer.txt:', err);
    return { success: false, message: 'Failed to read quote preferences.' };
  }

  // Fetch quotes from the API using dynamic categories
  const fetchQuotes = () => {
    return new Promise((resolve, reject) => {
      const requestUrl = `${apiUrl}${categories}&api_key=${apiKey}`;  // Append categories and API key to the URL

      https.get(requestUrl, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Process the result.
        resp.on('end', () => {
          try {
            const apiResponse = JSON.parse(data);
            if (apiResponse.success && apiResponse.data) {
              // Convert the response to the required format
              const formattedQuotes = apiResponse.data.map((quote) => ({
                text: quote.quote,  // Use 'quote' for the 'text' field
                author: quote.author,  // 'author' remains the same
              }));
              resolve(formattedQuotes);
            } else {
              reject('Invalid API response format.');
            }
          } catch (error) {
            reject('Error parsing API response.');
          }
        });
      }).on('error', (err) => {
        reject(err.message);
      });
    });
  };

  // Fetch and update quotes
  try {
    const newQuotes = await fetchQuotes();
    fs.writeFileSync(quotesPath, JSON.stringify(newQuotes, null, 2), 'utf8');
    return { success: true, message: 'Quotes updated successfully.' };
  } catch (error) {
    console.error('Error updating quotes:', error);
    return { success: false, message: error };
  }
});




ipcMain.handle('set-window-size', (event, width, height) => {
  mainWindow.setSize(width, height);
});

ipcMain.handle('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.handle('close-window', () => {
  mainWindow.close();
});