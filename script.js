const msgDiv = document.getElementById("messages");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const messagesDiv = [];
const lclStr = JSON.parse(localStorage.getItem("items"));
const clearBtn = document.getElementById("clear")

function printFromLS() {
  lclStr.map((msg) => {
    msgDiv.innerHTML += msg;
  });
}
printFromLS();

function send1() {
  if (input1.value === "") {
    return;
  } else {
    msgDiv.innerHTML += `
    <div class="user1">
        <h4>User 1</h4>
        <div class="user-message">
            ${input1.value}
        </div>  
        <button class="edit button">edit</button>
        <button class="delete button">Delete</button>
    </div>
    `;

    messagesDiv.push(`
    <div class="user1">
        <h4>User 1</h4>
        <div class="user-message">
            ${input1.value}
        </div>  
        <button class="edit button">edit</button>
        <button class="delete button">Delete</button>
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
        <div class="user-message">
            ${input2.value}
        </div>  
        <button class="edit button">edit</button>
        <button class="delete button">Delete</button>
    </div>
`;

    messagesDiv.push(`
    <div class="user2">
        <h4>User 2</h4>
        <div class="user-message">
            ${input2.value}
        </div>  
        <button class="edit button">edit</button>
        <button class="delete button">Delete</button>
    </div>
`);
    localStorage.setItem("items", JSON.stringify(messagesDiv));

    input2.value = "";
  }
}

function clearAll() {
  msgDiv.innerHTML = "";
  localStorage.clear()
}

clearBtn.addEventListener("click",() => ( clearAll())
 
);
