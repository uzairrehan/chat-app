const msgDiv = document.getElementById("messages");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const messagesDiv = [];
const lclStr = JSON.parse(localStorage.getItem("items"));
const clearBtn = document.getElementById("clear");

function printFromLS() {
  lclStr.map((msg) => {
    msgDiv.innerHTML += msg;
  });

  for (let i = 0; i < lclStr.length; i++) {
    messagesDiv.push(lclStr[i]);
  }
}
printFromLS();

function send1() {
  if (input1.value === "") {
    return;
  } else {
    msgDiv.innerHTML += `
    <div class="user1">
        <h4>User 1</h4>
        <p class="user-message">
            ${input1.value}
        </p>  
    </div>
    `;

    messagesDiv.push(`
    <div class="user1">
        <h4>User 1</h4>
        <p class="user-message">
            ${input1.value}
        </p> 
    </div>
    `);
    localStorage.setItem("items", JSON.stringify(messagesDiv));
    input1.value = "";
  }
}

function send2() {
  if (input2.value === "") {
    return;
  } else {
    msgDiv.innerHTML += `
    <div class="user2">
        <h4>User 2</h4>
        <p class="user-message">
            ${input2.value}
        </p>
    </div>
`;

    messagesDiv.push(`
    <div class="user2">
        <h4>User 2</h4>
        <p class="user-message">
            ${input2.value}
        </p>  
    </div>
`);
    localStorage.setItem("items", JSON.stringify(messagesDiv));

    input2.value = "";
  }
}

function clearAll() {
  msgDiv.innerHTML = "";
  localStorage.clear();
}

clearBtn.addEventListener("click", () => clearAll());

function deleteFnc(item) {}

// // this is from chat gpt for auto scroll to botm

const container = document.getElementById("messages");

const observer = new MutationObserver(() => {
  container.scrollTop = container.scrollHeight;
});

observer.observe(container, { childList: true });
