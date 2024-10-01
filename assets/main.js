const socket = io(); // получаем сокет = результат функции io
const messages = document.querySelector(".messages");
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const nameBlock = document.querySelector(".name");

// получение имени
const UserName = prompt("Ваше имя:");
nameBlock.innerHTML = `${UserName}`; // ввод имени при входе

// обработка формы, обработчик событий на метод submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // проверка на наличие сообщения, работа с сокетами
  if (input.value) {
    // отправка данных на сервер
    socket.emit("chat message", {
      message: input.value,
      name: UserName,
    });
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const item = document.createElement("li");
  item.innerHTML = `<span>${data.name}</span>: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
