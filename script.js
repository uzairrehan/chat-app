const msgDiv = document.getElementById("messages");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const messagesDiv = [];
const lclStr = JSON.parse(localStorage.getItem("items"));

function printFromLS() {
  lclStr.map((msg) => {
    msgDiv.innerHTML += msg;
  });
}
printFromLS();

function send1() {
  if (input1.value === "") {
    return
  } else {
    msgDiv.innerHTML += `
    <div class="user1">
        <h4>User 1</h4>
            ${input1.value}
    </div>
    `;

  messagesDiv.push(`
    <div class="user1">
        <h4>User 1</h4>
            ${input1.value}
    </div>
    `);
  localStorage.setItem("items", JSON.stringify(messagesDiv));
  input1.value = "";

 
  }
}

function send2() {
  if (input2.value === "") {
    return
  } else {
    msgDiv.innerHTML += `
    <div class="user2">
        <h4>User 2</h4>
            ${input2.value}
    </div>
`;

  messagesDiv.push(`
    <div class="user2">
        <h4>User 2</h4>
            ${input2.value}
    </div>
`);
  localStorage.setItem("items", JSON.stringify(messagesDiv));

  input2.value = "";
  
  }
}
