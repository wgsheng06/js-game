/**
 * 随机的模式
 */
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctxRect = canvas.getBoundingClientRect();

// let gameFrame = 0;
const explosives = [];

class Explosive {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.scale = 0.7;
    this.width = this.spriteWidth * this.scale;
    this.height = this.spriteHeight * this.scale;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = '../assets/img/boom/explosive.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.music = new Audio();
    this.music.src = '../assets/music/boom.wav';
  }

  update() {
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
      // this.x,
      // this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

canvas.addEventListener('click', createAnimation);
// canvas.addEventListener('mousemove', createAnimation);

function createAnimation(e) {
  const positionX = e.x - ctxRect.left;
  const positionY = e.y - ctxRect.top;
  explosives.push(new Explosive(positionX, positionY));
  console.log(explosives);
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < explosives.length; i++) {
    const explosive = explosives[i];
    explosive.update();
    explosive.draw();
    if (explosive.frame > 5) {
      explosives.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();
