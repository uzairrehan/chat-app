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
      <div class="user${msg.userClass}">
        <h4>User ${msg.user}</h4>
        <div id="message-${index}">
          <p class="user-message">${msg.content}</p>
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

function deleteMessage(index) {
  messagesDiv.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(messagesDiv));
  renderMessages();
}

function clearAll() {
  msgDiv.innerHTML = "";
  localStorage.clear();
  messagesDiv = [];
}

clearBtn.addEventListener("click", clearAll);
renderMessages();

document.getElementById("send1Btn").addEventListener("click", () => {
  sendMessage(1, input1.value);
  input1.value = "";
});

document.getElementById("send2Btn").addEventListener("click", () => {
  sendMessage(2, input2.value);
  input2.value = "";
});

// from chatgpt
function scrollToBottom() {
  msgDiv.scrollTop = msgDiv.scrollHeight;
}
const observer = new MutationObserver(scrollToBottom);
observer.observe(msgDiv, { childList: true });
