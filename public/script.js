const socket = io();

const chat = document.getElementById("chatform");
const input = document.getElementById("chatinput");
// prevent reload on sending the message
chat.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("chat", input.value);
  input.value = "";
});

const chatwindow = document.getElementById("chatwindow");

// function to show chat messeage at the frontend
const renderMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("render-message");
  div.innerText = message;
  chatwindow.appendChild(div);
};

socket.on("chat", (message) => {
  //console.log("Form server:", message);

  renderMessage(message);
});
