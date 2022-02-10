const form = document.querySelector("form");
const ul = document.querySelector("ul");
const button = document.querySelector("button");
const text = document.querySelector("textarea");
const input = document.getElementById("item");
const clear = document.getElementById("clear");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));

const liMaker = (text) => {
  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  itemsArray.push(text.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  liMaker(text.value);
  input.value = "";
});

data.forEach((item) => {
  liMaker(item);
});

clear.addEventListener("click", function () {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
});
