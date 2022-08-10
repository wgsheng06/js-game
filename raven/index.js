/**
 * 随机的模式
 */
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let ravens = [];
const gameSpeed = 5;

const image = new Image();
image.src = '../assets/img/raven/raven.png';
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
    this.out = false;
    this.frame = 0;
    this.gameFrame = 0;
    this.frameNum = 4;
    this.sinceFlapTime = 0;
    this.flapInterval = (100 / this.speed) * 3; // 根据乌鸦的速度计算拍动翅膀的速度
  }
  update(deltatime) {
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
    }
    if (this.x < -this.width) {
      this.out = true;
    }
  }
  draw() {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
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
  }
}
let ravenInterval = 600;
let lastTime = 0;
let timeToNextRaven = 0;

function animate(timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let deltatime = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextRaven += deltatime;
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven());
    timeToNextRaven = 0;
  }
  ravens.forEach((raven) => {
    raven.update(deltatime);
    raven.draw();
  });
  ravens = ravens.filter((raven) => !raven.out);
  requestAnimationFrame(animate);
}
animate(0);
