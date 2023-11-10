const btn = document.getElementById("generateBtn");
const responseEl = document.getElementById("generated-response");
let firstClick = true;

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
  const feelStatus = document.querySelector('input[name="feelStatus"]:checked').value;
  const userGender = document.querySelector('input[name="userGender"]:checked').value;
  const askerGender = document.querySelector('input[name="askerGender"]:checked').value;
  const includeQuestion = document.getElementById('includeQuestion');
  
  // Define the key for the response pool based on user and asker gender
  const responsePoolKey = `${userGender}_${feelStatus}`;

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
    setTimeout(() => {
      iconEl.style.display = 'inline'; // Make the icon visible
      iconEl.style.opacity = 1; // Make the icon visible
    }, 20)


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

document.getElementById('advancedOptions').addEventListener('click', function() {
  var form = document.querySelector('.form-questions');
  if (form.style.display === 'none') {
    form.style.opacity = '0';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.alignItems = 'center';
    form.style.justifyContent = 'center';
    advancedOptions.innerHTML = 'הגדרות מתקדמות	&#9653;';
    setTimeout(function() {
      form.style.opacity = '1'; // Fade in the form
    }, 10);
  } else {
    form.style.opacity = '0';
    setTimeout(function() {
      form.style.display = 'none';
    }, 500);
    advancedOptions.innerHTML = 'הגדרות מתקדמות &#9661;';
  }
});

document.getElementById('includeQuestion').addEventListener('change', function() {
  var askerGenderSelection = document.getElementById('askerGenderSelection');
  if (this.checked) {
    // Checkbox is selected
    // Perform actions when the checkbox is selected
    askerGenderSelection.style.display = 'flex';
    setTimeout(function() {
      askerGenderSelection.style.opacity = '1'; // Fade in the asker gender selection
    }, 10);
    } else {
    // Checkbox is deselected
    // Perform actions when the checkbox is deselected
    setTimeout(function() {
      askerGenderSelection.style.opacity = '0'; // Fade out the asker gender selection
    }, 10);
    setTimeout(function() {
      askerGenderSelection.style.display = 'none';
    }, 200); // Adjust the delay to match the transition duration in CSS
  }
});

function toggleGenderSelection() {
  var checkbox = document.getElementById("checkbox");
  var genderSelection = document.getElementById("genderSelection");

  if (checkbox.checked) {
    genderSelection.style.display = "block";
  } else {
    genderSelection.style.display = "none";
  }
}

function updateElementPositions() {
  const body = document.querySelector('.body');
  const container = document.querySelector('.container');
  const advancedOptions = document.getElementById('advancedOptions');
  const formQuestions = document.querySelector('.form-questions');

  // Get the bounding rectangle of the container, including its absolute position on the page
  const containerRect = container.getBoundingClientRect();

  // Calculate the positions based on the height of the elements and the window's width
  const buttonTopPosition = containerRect.bottom + window.scrollY + 10; // 10px space below the container
  const formTopPosition = buttonTopPosition + advancedOptions.offsetHeight + 10; // 10px space below the button

  // body.style.height = '98vh';
  advancedOptions.style.top = `${buttonTopPosition}px`;
  formQuestions.style.top = `${formTopPosition}px`;
}

// Link the copy button with the copyToClipboard function
const copyBtn = document.getElementById('copy-icon');
copyBtn.addEventListener('click', copyToClipboard);

var form = document.querySelector('.form-questions');
form.style.display = 'none';

askerGenderSelection.style.opacity = '0'; 
askerGenderSelection.style.display = 'none';

// SVG code for alternate icon
const copyIcon = 'copy.svg';
const altIcon = 'check.svg';

window.addEventListener('load', updateElementPositions);
window.addEventListener('resize', updateElementPositions);
window.addEventListener('orientationchange', updateElementPositions);