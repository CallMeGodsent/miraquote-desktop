// Prefill the API key input with the text file content when the settings page loads
window.electronAPI.getApiKey().then((apiKey) => {
    document.getElementById('api-key').value = apiKey; // Prefill the input field with API key
  });
  
  // Handle form submission to save the API key
  document.getElementById('api-key-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
  
    const apiKey = document.getElementById('api-key').value; // Get API key from input field
    
    try {
      // Use IPC to save the API key (via your main process)
      await window.electronAPI.saveApiKey(apiKey); // This calls the function in the main process
      document.getElementById('status-message').textContent = 'API Key saved successfully!'; // Show success message
    } catch (error) {
      // Show error message if saving the API key fails
      document.getElementById('status-message').textContent = 'Error saving API Key.';
    }
  });

  window.electronAPI.getQuoteType().then((quoteType) => {
    document.getElementById('quote-type').value = quoteType;
  });
 // Handle form submission to save the Quote Type
  document.getElementById('quote-type-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
  
    const quoteType= document.getElementById('quote-type').value;
    
    try {
      await window.electronAPI.saveQuoteType(quoteType);
      document.getElementById('qstatus-message').textContent = 'Your preference saved successfully!';
    } catch (error) {
      document.getElementById('qstatus-message').textContent = 'Error saving your preferance.';
    }
  });
  
  
  // Minimize and close window buttons
  document.getElementById('minimize-btn').addEventListener('click', () => window.electronAPI.minimizeWindow());
  document.getElementById('close-btn').addEventListener('click', () => window.electronAPI.closeWindow());
  
  // Toggle visibility of About section
  document.getElementById('about-btn').addEventListener('click', () => {
    const aboutSection = document.getElementById('about-info');
    
    // Toggle the visibility of the About section
    if (aboutSection.style.display === 'none') {
      aboutSection.style.display = 'block';  // Show the about section
    } else {
      aboutSection.style.display = 'none';  // Hide the about section if it's already visible
    }
  });
  
  // Handle back to home button (you can link this to your home page)
  document.getElementById('home-btn').addEventListener('click', () => {
    // Add logic for going back to home page if needed
    console.log('Back to Home button clicked');
  });
  