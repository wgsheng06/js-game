/**
 * 随机的正弦余弦模式
 */
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const enemyNumber = 50;
let gameFrame = 0;
const imageSrc = '../assets/img/enemy/enemy4.png';

class Enemy {
  constructor(spriteWidth, spriteHeight, isStop) {
    this.isStop = isStop; // 猜猜哪个是不动的
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = 2;
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / this.scale;
    this.height = this.spriteHeight / this.scale;
    this.x = Math.random() * (CANVAS_WIDTH - this.width);
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.newX = Math.random() * (CANVAS_WIDTH - this.width);
    this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.interval = Math.floor(Math.random() * 900 + 100);
  }

  update() {
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
    if (this.isStop || gameFrame === 0) {
      return;
    }
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.width);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
  }
  draw() {
    this.isStop && ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
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
const enemies = [];
const stopNumber = Math.floor(Math.random() * enemyNumber);
for (let e = 0; e < enemyNumber; e++) {
  enemies.push(new Enemy(213, 213, stopNumber === e));
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
