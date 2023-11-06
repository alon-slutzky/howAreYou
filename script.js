const btn = document.getElementById("generateBtn");
const responseEl = document.getElementById("generated-response");
let firstClick = true;
let timeout = 0

let responses;

// Fetch the responses from the JSON file
fetch("responses.json")
.then((response) => response.json())
.then((data) => {
  responses = data;

  // btn.addEventListener("click", () => {
  //   const userGender = document.querySelector('input[name="userGender"]:checked').value;
  //   const askerGender = document.querySelector('input[name="askerGender"]:checked').value;
  //   const includeQuestion = document.getElementById('includeQuestion');

  //   // Generate the response and show the icon and set the response text
  //   generateResponse(userGender, askerGender, includeQuestion);
  // });
})

.catch((error) => {
  console.error("Error fetching the responses:", error);
});

// Function to generate response
function generateResponse() {

  const userGender = document.querySelector('input[name="userGender"]:checked').value;
  const askerGender = document.querySelector('input[name="askerGender"]:checked').value;
  const includeQuestion = document.getElementById('includeQuestion');
  
  // Define the key for the response pool based on user and asker gender
  const responsePoolKey = `${userGender}_to_${askerGender}`;
  console.log(responsePoolKey)

  const followUpQuestionsKey = `followup_questions_${askerGender}`;

  // Select a random response from the appropriate pool
  const randomResponse = responses[responsePoolKey][Math.floor(Math.random() * responses[responsePoolKey].length)];

  let finalResponse = randomResponse;

  // If a follow-up question should be included, select one and append it
  if (includeQuestion.checked) {
    const randomQuestion = responses[followUpQuestionsKey][Math.floor(Math.random() * responses[followUpQuestionsKey].length)];
    finalResponse += `. ${randomQuestion}`;
  }

  // Set the new response text and make the response and icon visible
  const responseEl = document.getElementById('generated-response');
  const iconEl = document.getElementById('copy-icon');

  if (!firstClick) {
    responseEl.style.opacity = 0;
    iconEl.style.opacity = 0;
    setTimeout(() => {
      responseEl.textContent = finalResponse; // Set the response text
      responseEl.style.opacity = 1; 
      iconEl.style.opacity = 1;
      copyBtn.classList.replace("check", "copy");
      copyBtn.src = copyIcon; 
    }, 400)
  } else {
    responseEl.textContent = finalResponse; // Set the response text
    responseEl.style.visibility = 'visible'; // Make the response text visible
    responseEl.style.opacity = 1; 
    iconEl.style.display = 'inline'; // Make the icon visible
    iconEl.style.opacity = 1; // Make the icon visible

  }

  firstClick = false;
  iconEl.style.display = 'inline'; // Make the icon visible
}

// copyToClipboard function updated to copy the generated response
function copyToClipboard() {
  const textToCopy = document.getElementById('generated-response').textContent;
  
  var tempElement = document.createElement('textarea');
  tempElement.value = textToCopy;  
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand('copy');
  document.body.removeChild(tempElement);
  copyBtn.src = altIcon; 
  copyBtn.classList.replace("copy", "check");
}


// Link the copy button with the copyToClipboard function
const copyBtn = document.getElementById('copy-icon');
copyBtn.addEventListener('click', copyToClipboard);

// SVG code for alternate icon
const copyIcon = 'copy.svg';
const altIcon = 'check.svg';
