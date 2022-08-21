/**
 * 随机的模式
 */
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
// const CANVAS_WIDTH = window.innerWidth;
// const CANVAS_HEIGHT = window.innerHeight;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas2.width = CANVAS_WIDTH;
canvas2.height = CANVAS_HEIGHT;
let ravens = [];
const gameSpeed = 5;

const image = new Image();
image.src = '../assets/img/raven/raven.png';
let ravenInterval = 600;
let lastTime = 0;
let timeToNextRaven = 0;
let scope = 0;
let GameOver = false;
let particles = [];
class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.scale = (Math.random() % 0.25) + 0.25;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = CANVAS_WIDTH;
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.speed = Math.random() * gameSpeed + gameSpeed * 0.5;
    this.speedY = Math.random() * gameSpeed - gameSpeed * 0.5;
    this.destroyed = false;
    this.frame = 0;
    this.gameFrame = 0;
    this.frameNum = 4;
    this.sinceFlapTime = 0;
    this.flapInterval = (100 / this.speed) * 3;
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.hasParticle = Math.random() > 0.5;
    this.color = `rgb(${this.randomColors.join(',')})`;
  }
  update(deltatime) {
    if (this.destroyed) {
      return;
    }
    this.x -= this.speed;
    if (
      this.y + this.speedY < 0 ||
      this.y + this.speedY > CANVAS_HEIGHT - this.height
    ) {
      this.speedY = -this.speedY;
    }
    this.y += this.speedY;
    this.sinceFlapTime += deltatime;
    this.gameFrame = Math.floor(this.gameFrame + this.speed);
    if (this.sinceFlapTime > this.flapInterval) {
      this.frame > this.frameNum ? (this.frame = 0) : this.frame++;
      this.sinceFlapTime = 0;

      if (this.hasParticle) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this.color));
        }
      }
    }
    if (this.x < -this.width) {
      this.destroyed = true; // 直接销毁了
      GameOver = true;
    }
  }
  draw() {
    if (this.destroyed) {
      return;
    }
    ctx.drawImage(
      image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx2.fillStyle = this.color;
    ctx2.fillRect(this.x, this.y, this.width, this.height);
    // ctx2.
  }
}
let explosives = [];
class Explosive {
  constructor(x, y, scale) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.scale = scale || 0.7;
    this.width = this.spriteWidth * this.scale * 1.5;
    this.height = this.spriteHeight * this.scale * 1.5;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = '../assets/img/boom/explosive.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.music = new Audio();
    this.music.src = '../assets/music/boom.wav';
    this.destroyed = false;
  }

  // setPosition(x, y) {
  //   this.x = x;
  //   this.y = y;
  // }

  update() {
    if (this.frame > 5) {
      this.destroyed = true;
      return;
    }
    if (this.timer === 0) {
      this.music.play();
    }
    this.timer++;
    if (this.timer % 10 === 0) {
      this.frame++;
    }
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spriteWidth * this.frame,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
class Particle {
  constructor(x, y, scale, color) {
    this.scale = scale;
    this.radius = Math.random() * this.scale * 0.1;
    this.maxRadius = Math.random() * 15 + 15;
    this.x = x + this.scale * 0.5 + Math.random() * 24 - 12;
    this.y = y + this.scale * 0.33 + Math.random() * 24 - 12;
    this.destroyed = false;
    this.color = color;
    this.speedX = Math.random() * 1 + 0.5;
  }

  update() {
    this.x += this.speedX;
    this.radius += 0.2;
    if (this.radius > this.maxRadius - 5) {
      this.destroyed = true;
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
ctx.font = '50px Impact';
function drawScope() {
  if (GameOver) {
    ctx.fillStyle = '#000';
    ctx.fillText('Game Over', 50, 75);
    ctx.fillStyle = '#fff';
    ctx.fillText('Game Over', 46, 71);
  } else {
    ctx.fillStyle = '#000';
    ctx.fillText('Scope: ' + scope, 50, 75);
    ctx.fillStyle = '#fff';
    ctx.fillText('Scope: ' + scope, 46, 71);
  }
}
// let stop = false;
function animate(timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let deltatime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltatime;
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  [...particles, ...ravens, ...explosives].forEach((raven) => {
    raven.update(deltatime);
    raven.draw();
  });
  drawScope();
  ravens = ravens.filter((raven) => !raven.destroyed);
  explosives = explosives.filter((raven) => !raven.destroyed);
  particles = particles.filter((raven) => !raven.destroyed);
  if (!GameOver) {
    requestAnimationFrame(animate);
  } else {
    ravens = [];
    particles = [];
  }
}

// setTimeout(() => {
//   stop = true;
// }, 3000);

animate(0);

const getClickRaven = (imageColorData) => {
  return ravens.find(
    (raven) =>
      raven.randomColors[0] === imageColorData[0] &&
      raven.randomColors[1] === imageColorData[1] &&
      raven.randomColors[2] === imageColorData[2]
  );
};

canvas.addEventListener('click', (e) => {
  let left = e.offsetX;
  let top = e.offsetY;
  const imageData = ctx2.getImageData(left, top, 1, 1);
  const raven = getClickRaven(imageData.data);
  if (raven) {
    explosives.push(new Explosive(raven.x, raven.y, raven.scale));
    raven.destroyed = true;
    scope++;
  }
});
// canvas2.addEventListener('click', (e) => {
//   let left = e.x;
//   let top = e.y;
//   console.log('canvas2', left, top);
//   const imageData = ctx2.getImageData(left, top, 1, 1);

//   console.log(imageData);
// });
