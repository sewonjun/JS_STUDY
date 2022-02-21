const canvas = document.querySelector(".canvas");
const canvas2 = document.querySelector(".canvas2");
const context = canvas.getContext("2d");
const context2 = canvas2.getContext("2d");

context.arc(100, 100, 50, 0, Math.PI * 2, false);
context2.arc(100, 100, 50, 0, Math.PI * 2, false);
context.fill();
context2.fill();
