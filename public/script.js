const socket = io();

$("#loginSection").show();
$("#chatSection").hide();

const chat = document.getElementById("chatform");
const username = document.getElementById("username");
const chatinput = document.getElementById("chatinput");
const typing = document.getElementById("typing");
const login = document.getElementById("loginform");

login.addEventListener("submit", (event) => {
  event.preventDefault();
  $("#chatSection").show();
  $("#loginSection").hide();
});

//notify typing to the users
chatinput.addEventListener("input", (event) => {
  socket.emit("typing", { username: username.value });
});

// stop typing
chatinput.addEventListener("keyup", (event) => {
  socket.emit("stoptyping", "");
});

// prevent reload on sending the message
chat.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("chat", { message: chatinput.value, username: username.value });
  chatinput.value = "";
});

const chatwindow = document.getElementById("chatwindow");

// function to show chat messeage at the frontend
const renderMessage = (data) => {
  const div = document.createElement("div");
  div.classList.add("render-message");
  div.innerHTML = `<h3>${data.message}</h3> &emsp; by: ${data.username}`;
  chatwindow.appendChild(div);
};

socket.on("received", (data) => {
  //console.log("Form server:", message);

  renderMessage(data);
});

socket.on("notifyTyping", (data) => {
  //console.log(data);
  if (data) {
    typing.innerText = `${data.username} is typing...`;
  } else {
    typing.innerText = "";
  }
});

$("#chatinput").keyup(function (e) {
  if (e.keyCode == 13) {
    $(this).trigger("submit");
  }
});
