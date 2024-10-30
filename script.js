const msgDiv = document.getElementById("messages");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const clearBtn = document.getElementById("clear");
const send1btn = document.getElementById("send1Btn");
const send2btn = document.getElementById("send2Btn");

// Retrieve messages from local storage or initialize an empty array
let messagesDiv = JSON.parse(localStorage.getItem("items")) || [];

// Function to render messages in the chat
function renderMessages() {
  msgDiv.innerHTML = ""; // Clear existing messages
  // Build the HTML string for all messages
  const messagesHTML = messagesDiv.map((msg, index) => `
    <div class="${msg.userClass}"> <!-- Use userClass for div class -->
      <h4>User ${msg.user}</h4>
      <div id="message-${index}">
        <p class="user-message">${msg.content}</p>
        <button class="button" onclick="deleteMessage(${index})">Delete</button>
      </div>
    </div>
  `).join(""); // Join the array into a single string

  msgDiv.innerHTML = messagesHTML; // Set the innerHTML to the built string
  scrollToBottom(); // Scroll to bottom after rendering
}


// Function to send a message
function sendMessage(user, messageContent) {
  if (!messageContent) return; // Don't send empty messages

  const userClass = user === 1 ? "user1" : "user2"; // Assign class based on user
  const messageData = { user, userClass, content: messageContent }; // Message object

  messagesDiv.push(messageData); // Add message to the array
  localStorage.setItem("items", JSON.stringify(messagesDiv)); // Update local storage

  renderMessages(); // Re-render messages
}

// Function to delete a message
function deleteMessage(index) {
  messagesDiv.splice(index, 1); // Remove message from the array
  localStorage.setItem("items", JSON.stringify(messagesDiv)); // Update local storage
  renderMessages(); // Re-render messages
}

// Function to clear all messages
function clearAll() {
  msgDiv.innerHTML = ""; // Clear displayed messages
  localStorage.clear(); // Clear local storage
  messagesDiv = []; // Reset messages array
}

// Event listeners
clearBtn.addEventListener("click", clearAll); // Clear all messages
renderMessages(); // Initial render from localStorage

send1btn.addEventListener("click", () => {
  sendMessage(1, input1.value.trim()); // Send message for user 1
  input1.value = ""; // Clear input field
});

send2btn.addEventListener("click", () => {
  sendMessage(2, input2.value.trim()); // Send message for user 2
  input2.value = ""; // Clear input field
});

// Function to scroll to the bottom of the messages div
function scrollToBottom() {
  msgDiv.scrollTop = msgDiv.scrollHeight; // Scroll to bottom
}

// Observer for auto-scrolling
const observer = new MutationObserver(scrollToBottom);
observer.observe(msgDiv, { childList: true });
