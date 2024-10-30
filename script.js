const msgDiv = document.getElementById("messages");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const clearBtn = document.getElementById("clear");

let messagesDiv = JSON.parse(localStorage.getItem("items")) || [];

function renderMessages() {
  msgDiv.innerHTML = "";
  messagesDiv.forEach((msg, index) => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `
      <div class="${msg.userClass}">
        <h4>User ${msg.user}</h4>
        <div id="message-${index}">
          <p class="user-message">${msg.content}</p>
          <button class="button" onclick="enableEdit(${index})">Edit</button>
          <button class="button" onclick="deleteMessage(${index})">Delete</button>
        </div>
      </div>
    `;
    msgDiv.appendChild(messageElement);
  });
  scrollToBottom();
}

function sendMessage(user, messageContent) {
  if (!messageContent) return;

  const userClass = user === 1 ? "user1" : "user2";
  const messageData = { user, userClass, content: messageContent };

  messagesDiv.push(messageData);
  localStorage.setItem("items", JSON.stringify(messagesDiv));

  renderMessages();
}

function enableEdit(index) {
  const messageContainer = document.getElementById(`message-${index}`);
  const originalContent = messagesDiv[index].content;

  messageContainer.innerHTML = `
    <input type="text" id="editInput-${index}" value="${originalContent}" class="input" />
    <button  class="button"  onclick="saveEdit(${index})">Save</button>
    <button  class="button"  onclick="cancelEdit(${index}, '${originalContent}')">Cancel</button>
  `;
}

function saveEdit(index) {
  const editInput = document.getElementById(`editInput-${index}`);
  const updatedContent = editInput.value.trim();

  if (updatedContent) {
    messagesDiv[index].content = updatedContent;
    localStorage.setItem("items", JSON.stringify(messagesDiv));
    renderMessages();
  }
}

function cancelEdit(index, originalContent) {
  const messageContainer = document.getElementById(`message-${index}`);
  messageContainer.innerHTML = `
    <p class="user-message">${originalContent}</p>
    <button  class="button" onclick="enableEdit(${index})">Edit</button>
    <button  class="button"  onclick="deleteMessage(${index})">Delete</button>
  `;
}

function deleteMessage(index) {
  messagesDiv.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(messagesDiv));
  renderMessages();
}

function scrollToBottom() {
  msgDiv.scrollTop = msgDiv.scrollHeight;
}

function clearAll() {
  msgDiv.innerHTML = "";
  localStorage.clear();
  messagesDiv = [];
}

clearBtn.addEventListener("click", clearAll);
renderMessages();

document.getElementById("send1Btn").addEventListener("click", () => {
  sendMessage(1, input1.value.trim());
  input1.value = "";
});

document.getElementById("send2Btn").addEventListener("click", () => {
  sendMessage(2, input2.value.trim());
  input2.value = "";
});

// from chatgpt
const observer = new MutationObserver(scrollToBottom);
observer.observe(msgDiv, { childList: true });