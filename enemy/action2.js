/**
 * 无限向左的垂直正弦的模式
 */
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const enemyNumber = 300;
let gameFrame = 0;
const imageSrc = '../assets/img/enemy/enemy2.png';
// const image = new Image();
// image.src = '../assets/img/enemy/enemy1.png';

class Enemy {
  constructor(spriteWidth, spriteHeight) {
    // this.image = image;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = 2;
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.width = this.spriteWidth / this.scale;
    this.height = this.spriteHeight / this.scale;
    this.x =
      Math.random() *
      (CANVAS_WIDTH -
        this.width) /** 初始位置保证在canvas的x，y内，因为区域有宽高 */;
    this.y = Math.random() * (CANVAS_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 2);
    this.angle = 0;
    this.angleSpeed = Math.random() * 0.2;
    this.curve = Math.random() * 6;
  }

  update() {
    this.x -= this.speed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) {
      this.x = CANVAS_WIDTH;
    }
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    // ctx.strokeRect(this.x, this.y, this.width, this.height);
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
for (let e = 0; e < enemyNumber; e++) {
  enemies.push(new Enemy(266, 188));
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
