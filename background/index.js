import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constant.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const backgroundLayer1 = new Image();
backgroundLayer1.src = '../assets/img/background/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '../assets/img/background/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '../assets/img/background/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '../assets/img/background/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '../assets/img/background/layer-5.png';

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
let gameSpeed = 6;

// 不使用游戏帧，原因是改变游戏帧会导致背景跳跃
let gameFrame = 0;

window.addEventListener('load', () => {
  const slider = document.getElementById('slider');
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById('showGameSpeed');
  showGameSpeed.innerHTML = gameSpeed;

  slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(image, gameModifier) {
      this.width = 2400;
      this.height = 700;
      this.x = 0;
      this.y = 0;
      this.image = image;
      this.gameModifier = gameModifier;
    }

    update() {
      this.speed = gameSpeed * this.gameModifier;
      if (this.x < -1 * this.width) {
        this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);

  const layers = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layers.forEach((layer) => {
      layer.update();
      layer.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
});
