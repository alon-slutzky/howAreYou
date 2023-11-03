const btn = document.getElementById('generateBtn');
const responseEl = document.getElementById('response');

let responses = [];

// Fetch the responses from the JSON file
fetch('responses.json')
  .then(response => response.json())
  .then(data => {
    responses = data.responses;

    btn.addEventListener('click', () => {
        // Fade out the current text
        responseEl.style.opacity = '0';

        setTimeout(() => {
            // Get a new random response
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            // Set the new response text
            responseEl.textContent = randomResponse;

            // Fade in the new text
            responseEl.style.opacity = '1';
        }, 250); // This delay matches the 0.5s transition time in the CSS
    });
  })
  .catch(error => {
    console.error("Error fetching the responses:", error);
  });
