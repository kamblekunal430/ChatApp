const socket = io();

const chat = document.getElementById("chatform");
const input = document.getElementById("chatinput");
// prevent reload on sending the message
chat.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("chat", input.value);
  input.value = "";
});
