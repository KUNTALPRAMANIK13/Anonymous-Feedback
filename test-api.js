// Simple test to check if the API routes are accessible
console.log("Testing API routes...");

// Test if the server is running
fetch("http://localhost:3000/api/get-message")
  .then((response) => {
    console.log("Response status:", response.status);
    return response.json();
  })
  .then((data) => {
    console.log("Response data:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
