const socket = io();

$("#loginSection").show();
$("#chatSection").hide();

const chat = document.getElementById("chatform");
const username = document.getElementById("username");
const chatinput = document.getElementById("chatinput");

const login = document.getElementById("loginform");

login.addEventListener("submit", (event) => {
  event.preventDefault();
  $("#chatSection").show();
  $("#loginSection").hide();
});

// prevent reload on sending the message
chat.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("chat", { msg: chatinput.value, username: username.value });
  chatinput.value = "";
});

const chatwindow = document.getElementById("chatwindow");

// function to show chat messeage at the frontend
const renderMessage = (data) => {
  const div = document.createElement("div");
  div.classList.add("render-message");
  div.innerHTML = `<h3>${data.msg}</h3> By: ${data.username}`;
  chatwindow.appendChild(div);
};

socket.on("chat", (data) => {
  //console.log("Form server:", message);

  renderMessage(data);
});

$("#chatinput").keyup(function (e) {
  if (e.keyCode == 13) {
    $(this).trigger("submit");
  }
});
