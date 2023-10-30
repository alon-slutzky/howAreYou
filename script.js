// List of responses
const responses = [
    "Surviving, not thriving.",
    "Just taking it one day at a time.",
    "You don't wanna know.",
    "Better than yesterday, worse than tomorrow.",
    // Add as many as you like
  ];
  
  // Generate a random response
  function generateResponse() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    document.getElementById("response").innerText = responses[randomIndex];
  }
  
  // Attach the function to the button
  document.getElementById("generate").addEventListener("click", generateResponse);
  