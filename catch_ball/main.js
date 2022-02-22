const canvas = document.querySelector("canvas");
const score = document.querySelector("#score");

const context = canvas.getContext("2d");

canvas.width = innerWidth;
//-3이라는 것은 무슨 의미가 있는가 .. 위에 score는 16px인데 .. 뭐가 연관이 있나..,? 
canvas.height = innerHeight -3;

const bubbleArray = [];
const clickEventArray = [];

let scoreCount = 0;

//class bubble 만들기

class Bubble {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.fill();
  }
  update() {
    this.draw();
    this.radius += 0.5;
    //stop when two circles are correlates
    bubbleArray.forEach((bubble, bubbleIndex) => {
      let dist = Math.hypot(this.x - bubble.x, this.y - bubble.y);
      // To find distance between two bubble
      if (dist - this.radius - bubble.radius < 0.5 && bubble != this) {
        console.log(dist - this.radius - bubble.radius);
        // cancelAnimationFrame(animationId);
        // To stop the game
      }
    });
  }
}

class ClickEvent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = "green";
  }
}

function getBubble() {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let radius = 20;
  let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  }, 0.7)`;
  bubbleArray.push(new Bubble(x, y, radius, color));
}
//호출 스케줄링 setInterval은 일정 시간 간격을 두고 함수를 실행시키는 방법
setInterval(getBubble, 500);
let animationId;

function animate() {
  //requestAnimationFrame()은 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다.
  animationId = requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  bubbleArray.forEach((bubble) => {
    bubble.update();
  });
  clickEventArray.forEach((click, clickIndex) => {
    // console.log(click.x , bubble.x , click.y , bubble.y);
    bubbleArray.forEach((bubble, bubbleIndex) => {
      let dist = Math.hypot(click.x - bubble.x, click.y - bubble.y); // To find distance between two bubble
      if ((dist - bubble.radius - click.radius) < 0) {
        bubbleArray.splice(bubbleIndex, 1);
        scoreCount += 1;
        console.log(scoreCount);
        score.textContent = scoreCount;
      }
      clickEventArray.splice(clickIndex, 1);
    });
  });
}

addEventListener("click", (event) => {
  clickEventArray.push(new ClickEvent(event.clientX, event.clientY - 18));
});

animate();
